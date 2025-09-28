import { getBrowserInstance } from './helpers/sharedExt';

const msg = getBrowserInstance().i18n.getMessage;
const cl = decodeURIComponent(window.location.hash.slice(1)).split(' ').filter(c => !!c);
if (cl.length)
  document.body.classList.add(...cl);
if (__MV3__)
  document.body.classList.add('mv3');

// load translations
Array.from(document.querySelectorAll('.i18n, title')).forEach(e => {
  e.innerHTML = e.innerHTML.replace(/__MSG_(.+)__/g, (...args) => msg(args[1]));
  e.classList.remove('i18n');
});
Array.from(document.querySelectorAll<HTMLElement>('[data-i18n]')).forEach(e => {
  e.dataset.i18n.split(',').forEach(attr =>
    e.setAttribute(attr, e.getAttribute(attr).replace(/__MSG_(.+)__/g, (...args) => msg(args[1]))));
  e.removeAttribute('data-i18n');
});

const useTab = document.querySelector<HTMLInputElement>('[name="use-tab"]');
useTab.addEventListener('change', e => {
  getBrowserInstance().storage.local.set({ useTab: (e.target as HTMLInputElement).checked });
});

(async () => {
  useTab.checked = (await getBrowserInstance().storage.local.get({ useTab: false })).useTab;
})();