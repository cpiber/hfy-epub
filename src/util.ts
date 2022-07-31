import { cubicOut } from 'svelte/easing';
import type { ScaleParams, TransitionConfig } from 'svelte/transition';

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

export function isString(input: unknown): input is string { return typeof input === "string" || input instanceof String; }

export function fold(node: Element, {
  delay = 0,
  duration = 200,
  prop = 'height',
  easing = cubicOut,
}: ScaleParams & { prop?: keyof CSSStyleDeclaration; } = {}): TransitionConfig {
  const style = getComputedStyle(node);
  const curval = style[prop];
  if (!isString(curval) || !curval.endsWith('px')) throw new Error(`invalid property '${prop}' does not return pixels`);
  const px = +curval.slice(0, -2);

  return {
    delay,
    duration,
    easing,
    css: t => `overflow: hidden; ${prop}: ${t * px}px`
  };
}