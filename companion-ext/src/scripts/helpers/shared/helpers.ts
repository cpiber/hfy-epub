export const debounce = <T extends any[]>(func: (...args: T) => void, time = 500) => {
  let timeout = 0;
  return (...args: T) => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(func, time, ...args);
  };
};

export const arrFromLengthy = <T>(a: { length: number, [k: number]: T; }): T[] => Array.from(a);
export const isMobile = () => window.matchMedia('(any-hover: none)').matches;
export const clone = typeof cloneInto !== 'undefined' ?
  <T>(data: T) => cloneInto(data, document.defaultView) : // Firefox specific
  <T>(data: T) => data;
export const devClone = __DEV__ && typeof cloneInto !== 'undefined' ?
  <T>(name: string, data: T, ...names: string[]) => {
    let obj: any = window.wrappedJSObject;
    for (const n of names) obj = obj[n];
    obj[name] = cloneInto(data, document.defaultView, { cloneFunctions: true }); // Firefox specific
  } :
  () => {
    if (!__DEV__) throw new Error('THIS SHOULD NEVER HAVE GOTTEN INTO PROD');
  };
export const devExport = __DEV__ && typeof exportFunction !== 'undefined' ?
  (name: string, fn: () => any, ...names: string[]) => {
    let obj: any = window.wrappedJSObject;
    for (const n of names) obj = obj[n];
    Reflect.defineProperty(obj, name, { get: exportFunction(fn, window) }); // Firefox specific
  } :
  () => {
    if (!__DEV__) throw new Error('THIS SHOULD NEVER HAVE GOTTEN INTO PROD');
  };

export function injectScript(node: HTMLElement, content: string, friendly?: string, data?: any, w?: Window): Promise<void>;
export function injectScript(file: string, node: HTMLElement, friendly?: string, data?: any, w?: Window): Promise<void>;
export function injectScript(arg1: HTMLElement | string, arg2: HTMLElement | string, friendly?: string, data?: any, w = window) {
  return new Promise((resolve, reject) => {
    const gotSrc = typeof (arg2 as HTMLElement).appendChild !== 'undefined';
    const n = gotSrc ? arg2 as HTMLElement : arg1 as HTMLElement;
    const f = gotSrc ? arg1 as string : arg2 as string;

    const s = w.document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    const end = () => {
      s.remove();
      if (data) w.document.dispatchEvent(new w.CustomEvent(`enhancer-load-${friendly}`, clone({ detail: data })));
      resolve(void 0);
    };
    s.addEventListener('load', end);
    s.addEventListener('error', ev => {
      s.remove();
      console.error(ev);
      reject(ev);
    });
    if (gotSrc)
      s.setAttribute('src', f);
    else
      s.textContent = f;
    n.appendChild(s);
    if (!gotSrc)
      end(); // no on-load, do it manually
  });
}

export const getCookie = (name: string) => {
  const cookieArr = document.cookie.split(';');
  for (const cookie of cookieArr) {
    const cookiePair = cookie.split('=');
    if (name == cookiePair[0].trim())
      return decodeURIComponent(cookiePair[1]);
  }

  return null;
};

export const parseMaybeJSON = (data: string) => {
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};
export const parseTypeObject = <T extends { type: string; }>(data: string | Record<string, any>, nullable = false): T => {
  const d = typeof data === 'string' ? parseMaybeJSON(data) : data;
  if (typeof d === 'string') return { type: d } as T;
  if (typeof d.type === 'string') return d;
  if (nullable) return null;
  throw new TypeError('not convertible to type-object');
};