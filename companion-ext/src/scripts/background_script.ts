import { BrowserMessage, getBrowserInstance, parseTypeObject } from './helpers/sharedExt';

const fetchable = async (url: string | URL, timeout: number = 10000) => {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : {} as AbortController;
  const out = setTimeout(() => controller.abort && controller.abort(), timeout);

  try {
    return await fetch(url, { signal: controller.signal, credentials: "include" });
  } finally {
    clearTimeout(out);
  }
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
        ret = fetchable(msg.url).then(r => { if (!r.ok) throw '' + (r.statusText ?? r.status); return r; }).then(r => r.text());
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