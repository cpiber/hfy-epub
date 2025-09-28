import { type FetchStore } from './fetchstore';

const fetchable = async (url: string | URL, timeout: number) => {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : {} as AbortController;
  const out = setTimeout(() => controller.abort && controller.abort(), timeout);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(out);
  }
};

export const retryFetchURL = async (url: URL, timeout = 10000, retry = 3) => {
  for (let i = 0; i < retry - 1; i++) {
    try {
      return await fetchable(url, timeout);
    } catch {
      console.log(`Failed to fetch \`${url}\` ${i + 1} ${i === 0 ? 'time' : 'times'}. Retrying...`);
    }
  }
  // last try, no catching
  return fetchable(url, timeout);
};

export const retryFetch = async (url: string, origin: string, timeout = 10000, retry = 3) => {
  const u = new URL(url, origin);
  return retryFetchURL(u, timeout, retry);
};

export const retryFetchText = async (fetchStore: FetchStore, url: URL, timeout = 10000, retry = 3) => {
  if (fetchStore.authorize) {
    if (!await fetchStore.authorize(url.origin))
      throw new Error('Extension did not authorize');
  }
  for (let i = 0; i < retry - 1; i++) {
    try {
      if (fetchStore.fetch) return await fetchStore.fetch(url.toString());
      return await fetchable(url, timeout)
        .then(r => { if (!r.ok) throw '' + (r.statusText ?? r.status); return r; })
        .then(r => r.text());
    } catch {
      console.log(`Failed to fetch \`${url}\` ${i + 1} ${i === 0 ? 'time' : 'times'}. Retrying...`);
    }
  }
  // last try, no catching
  if (fetchStore.fetch) return await fetchStore.fetch(url.toString());
  return fetchable(url, timeout)
    .then(r => { if (!r.ok) throw '' + (r.statusText ?? r.status); return r; })
    .then(r => r.text());
};