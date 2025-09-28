import { Message, sendMessage } from './helpers/shared';

(() => {
  let iter = 0;
  const i = window.setInterval(() => {
    if (iter++ > 1000) window.clearInterval(i);
    if (!window.registerFetch) return;
    window.clearInterval(i);
    window.registerFetch({
      authorize: origin => sendMessage(Message.AUTHORIZE, { origin }),
      fetch: url => sendMessage(Message.FETCH, { url }),
    });
  }, 200);
})();