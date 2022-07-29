export const redditApiBase = 'www.reddit.com';

export const toApiCall = (url: URL | string) => {
  if (!(url instanceof URL)) url = new URL(url);
  url.hostname = redditApiBase;
  if (url.pathname.endsWith('/'))
    url.pathname = `${url.pathname.slice(0, url.pathname.length - 1)}.json`;
  else if (!url.pathname.endsWith('.json'))
    url.pathname += '.json';
  url.protocol = 'https';
  url.search = '';
  url.hash = '';
  return url.toString();
};

export const apiToRegular = (url: string) => url.slice(0, -5).replace('https://api', 'https://www');

// https://stackoverflow.com/a/34064434/
export const decode = (() => {
  const parser = new DOMParser();
  return (text: string) => parser.parseFromString(text, 'text/html').documentElement.textContent;
})();

export const copyData = (bookData: Immutable<Bookdata>): Bookdata => ({ ...bookData, chapters: bookData.chapters.map(c => ({ ...c })) });