import { BrowserMessage, getBrowserInstance } from './helpers/sharedExt';

(() => {
  getBrowserInstance().runtime.sendMessage(BrowserMessage.INIT_PAGE);
})();

