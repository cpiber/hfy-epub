import { writable } from 'svelte/store';

const def = {
  authorize: undefined as ((origin: string) => Promise<boolean>) | undefined,
  fetch: undefined as ((url: string) => Promise<string>) | undefined,
};
export type FetchStore = typeof def;
export const fetchStore = writable(def);

(window as any).registerFetch = ({ authorize, fetch }: typeof def) => {
  if (!authorize || !authorize.apply)
    throw new Error('authorize does not look like a function');
  if (!fetch || !fetch.apply)
    throw new Error('fetch does not look like a function');
  console.log('Extension connected');
  fetchStore.set({
    authorize,
    fetch,
  });
};