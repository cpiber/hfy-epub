import { BrowserMessage, getBrowserInstance, parseTypeObject } from './helpers/sharedExt';

let activeTab: browser.tabs.Tab | undefined = undefined;
let activeTabPromise: Promise<string> | undefined = undefined;

const fetchable = async (url: string | URL, timeout: number = 10000) => {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : {} as AbortController;
  const out = setTimeout(() => controller.abort && controller.abort(), timeout);

  try {
    return await fetch(url, { signal: controller.signal, credentials: "include" });
  } finally {
    clearTimeout(out);
  }
};

const fetchUrlForUser = async (url: string) => {
  const { useTab, waitForSelector } = await getBrowserInstance().storage.local.get({ useTab: false, waitForSelector: '' });
  if (!useTab) {
    const r = await fetchable(url);
    if (!r.ok) throw '' + (r.statusText ?? r.status);
    return await r.text();
  }

  console.log('Fetch:', url, 'using tab (interactive)');
  activeTabPromise ??= Promise.resolve("");
  return activeTabPromise = activeTabPromise.catch(() => "").then(async () => {
    activeTab ??= await getBrowserInstance().tabs.create({ active: false });
    await getBrowserInstance().tabs.update(activeTab.id, {
      url,
    });
    await new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        getBrowserInstance().tabs.onUpdated.removeListener(listener);
        reject("timeout");
      }, 10000);
      const listener = (tabId: number, details: browser.tabs._OnUpdatedChangeInfo) => {
        if (activeTab && tabId === activeTab.id && details.status === "complete") {
          window.clearTimeout(timeout);
          getBrowserInstance().tabs.onUpdated.removeListener(listener);
          resolve(void 0);
        }
      };
      getBrowserInstance().tabs.onUpdated.addListener(listener);
    });
    if (!waitForSelector) {
      const res = await getBrowserInstance().tabs.executeScript(activeTab.id, {
        code: 'document.body.parentElement.outerHTML',
      });
      return res[0];
    } else {
      return await new Promise((resolve, reject) => {
        let iter = 0;
        const i = window.setInterval(async () => {
          if (iter++ > 100) {
            window.clearInterval(i);
            reject("timeout waiting for selector");
            return;
          }
          const code = '!!document.querySelector("' + (new String(waitForSelector).replace(/"/g, '\\"')) + '")';
          console.dev.log('Executing', code);
          const res = await getBrowserInstance().tabs.executeScript(activeTab.id, {
            code,
          });
          console.dev.log('Page result:', res);
          if (!res[0]) return;
          const res2 = await getBrowserInstance().tabs.executeScript(activeTab.id, {
            code: 'document.body.parentElement.outerHTML',
          });
          window.clearInterval(i);
          resolve(res2[0]);
        }, 500);
      });
    }
  });
};

getBrowserInstance().runtime.onMessage.addListener((message: string | { [key: string]: any; }, sender, sendResponse) => {
  // Return early if this message isn't meant for the background script
  console.log(message);
  if (typeof message !== 'string' && message.target !== undefined && message.target !== 'background') {
    return;
  }

  const keepAlive = setInterval(getBrowserInstance().runtime.getPlatformInfo, 25 * 1000);
  let ret: Promise<any>;
  try {
    const msg = parseTypeObject<{ type: string, name?: string;[key: string]: string, }>(message);
    if (__DEV__) console.log('Handling message', msg);
    switch (msg.type) {
      case BrowserMessage.FETCH:
        ret = fetchUrlForUser(msg.url);
        break;
    }
    if (ret) {
      ret.then(
        res => {
          if (__DEV__) console.log('Result for', msg.type, ':', res);
          sendResponse({ res });
        },
        err => {
          if (__DEV__) console.log('Error running', msg.type, ':', err);
          sendResponse({ err: err.message || err });
        },
      );
      return true;
    }
  } catch {
  } finally {
    clearInterval(keepAlive);
  }
});

getBrowserInstance().tabs.onRemoved.addListener((tabId) => {
  if (activeTab && activeTab.id === tabId)
    activeTab = undefined;
});