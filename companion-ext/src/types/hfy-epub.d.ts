type FetchStore = {
  authorize: (origin: string) => Promise<boolean>,
  fetch: (url: string) => Promise<string>,
};

interface Window {
  registerFetch: ((handlers: FetchStore) => void) | undefined,
}