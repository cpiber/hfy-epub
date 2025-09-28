import { getBrowserInstance } from './sharedExt';

const msg = getBrowserInstance().i18n.getMessage;

const create = <K extends keyof HTMLElementTagNameMap>(tag: K, keys?: { textContent?: string; } & Partial<Record<keyof HTMLElementTagNameMap[K], string>>, ...children: HTMLElement[]): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag);
  if (keys.textContent) e.textContent = keys.textContent;
  if (keys.innerHTML) e.innerHTML = keys.innerHTML;
  if (keys.className) e.className = keys.className;
  for (const k of Object.keys(keys)) {
    if (k === 'textContent' || k === 'children' || k === 'className' || k === 'innerHTML') continue;
    e.setAttribute(k as string, keys[k]);
  }
  if (children) {
    e.append(...children);
  }
  return e;
};

export const permissionModal = (origin: string): Promise<boolean> => {
  const root = document.body.appendChild(document.createElement('div'));
  const shadow = root.attachShadow({ mode: 'closed' });
  const style = document.createElement('style');
  fetch(getBrowserInstance().runtime.getURL('/styles/modal.css')).then(r => r.text()).then(s => style.textContent = s);
  shadow.append(style);

  return new Promise<boolean>(resolve => {
    const grant = create('button', { textContent: msg('pageRequestsAuthGrant') });
    const disallow = create('button', { textContent: msg('pageRequestsAuthReject') });
    grant.addEventListener('click', () => resolve(true));
    disallow.addEventListener('click', () => resolve(false));
    const modalRoot = create('div', { className: 'modal-outer' }, create('div', { className: 'modal' },
      create('h2', { textContent: msg('pageRequestsAuth') }),
      create('span', { innerHTML: msg('pageRequestsAuthDetails', origin) }),
      create('div', { className: 'buttons' }, grant, disallow),
    ));
    shadow.append(modalRoot);
    modalRoot.style.display = 'block';
  }).finally(() => {
    root.remove();
  });
};