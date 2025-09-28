import { permissionModal } from './helpers/modal';
import { BrowserMessage, Message, getBrowserInstance, injectScript, parseTypeObject, replyMessage } from './helpers/sharedExt';

const authorizedOrigins: string[] = [];
let activeAuthPromise: Promise<boolean> | undefined = undefined;

type Msg = { type: string, name?: string, [key: string]: any; };

/**
 * handle postMessage event
 * @returns `true` if event handeled, else parsed message
 */
const handle = (e: MessageEvent) => {
  if (!e.origin.match(window.origin))
    return true;
  const msg = parseTypeObject<Msg>(e.data, true);
  if (msg === null)
    return true; // ignore invalid messages
  if (msg.type.startsWith('companion-message-') || msg.type.startsWith('companion-event-'))
    return true; // ignore replies and events
  console.dev.debug('Handling message', msg);

  let promise: Promise<any> = null;
  try {
    switch (msg.type) {
      case Message.GET_MESSAGE:
        promise = Promise.resolve(getBrowserInstance().i18n.getMessage(msg.message));
        break;
      case Message.AUTHORIZE:
        console.log('Authorize:', msg.origin);
        activeAuthPromise ??= Promise.resolve(true);
        promise = activeAuthPromise = activeAuthPromise.catch(() => true).then(() => {
          if (!/^https?:\/\/.*$/.test(msg.origin))
            throw new Error('Invalid origin');
          if (authorizedOrigins.indexOf(msg.origin) >= 0) return Promise.resolve(true);
          else return permissionModal(msg.origin).then(r => {
            const idx = authorizedOrigins.indexOf(msg.origin);
            if (r && idx < 0) authorizedOrigins.push(msg.origin);
            else if (!r && idx >= 0) authorizedOrigins.splice(idx, 1);
            return r;
          });
        });
        break;
      case Message.FETCH: {
        console.log('Fetch:', msg.url);
        const u = new URL(msg.url);
        if (authorizedOrigins.indexOf(u.origin) < 0)
          throw new Error(`Origin ${u.origin} not authorized through extension`);
        promise = getBrowserInstance().runtime.sendMessage({ type: BrowserMessage.FETCH, url: msg.url })
          .then(r => {
            if (r.err !== undefined && r.err !== null) throw new Error(r.err);
            else return r.res;
          });
      } break;
      case Message.REGISTER_LISTENER:
        registerListener(e, msg);
        return true;
      default:
        return msg;
    }
  } catch (err) {
    replyMessage(e, msg.name, null, err);
    return true;
  }
  // use raw promises here because we don't care about the return value, let the rest of the handler continue
  promise.then(val => replyMessage(e, msg.name, val, null)).catch(err => replyMessage(e, msg.name, null, err));
  return true;
};

const registerListener = (e: MessageEvent, msg: Msg) => {
  switch (msg.event) {
  }
};

(async () => {
  console.log(window.origin);
  if (window.origin !== 'https://cpiber.github.io' && (__DEV__ ? window.origin !== 'http://localhost:8080' : true)) return;

  window.addEventListener('message', handle);
  // getBrowserInstance().runtime.sendMessage(BrowserMessage.INIT_PAGE);
  await injectScript(getBrowserInstance().runtime.getURL('/scripts/page_script.js'), document.body);
})();
