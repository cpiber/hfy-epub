
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
  for (let i = 0; i < retry - 1; i++) {
    try {
      return await fetchable(u, timeout);
    } catch {
      console.log(`Failed to fetch \`${u}\` ${i + 1} ${i === 0 ? 'time' : 'times'}. Retrying...`);
    }
  }
  // last try, no catching
  return fetchable(u, timeout);
};