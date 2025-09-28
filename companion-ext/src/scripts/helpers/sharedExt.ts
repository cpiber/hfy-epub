import browser from 'webextension-polyfill';
export * from './shared';

export const getBrowserInstance = () => browser; // poly-filled
export const isChrome = () => (globalThis as any).chrome !== undefined;

export function getFromStorage<T extends { [key: string]: any; }>(key: T): Promise<T>;
export function getFromStorage<T>(key?: string | string[] | null): Promise<T>;
export function getFromStorage<T>(key?: string | string[] | { [key: string]: any; } | null) {
  const { sync, local } = browser.storage;
  return (sync || local).get(key) as Promise<T>;
}
export function setToStorage(key: { [key: string]: any; }) {
  const { sync, local } = browser.storage;
  return (sync || local).set(key);
}