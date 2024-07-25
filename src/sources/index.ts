import { ChapterTransformType, config, NextLinkType, type Config } from '../configstore';
import { retryFetch } from '../fetch';
import { isString, toApiCall } from '../util';
import { getGenericContent, getGenericData } from './cors';
import { sandboxFn } from './fn';
import { getSeriesPageData as getHFYSeriesPageData, isSeriesPage as isHFYSeriesPage } from './hfy';
import { getPostContent, getPostData, isPost } from './post';
import { commentLinkHTML } from './re';

export enum Source {
  HFY_SERIES,
  POST,
  GENERIC,
  SEARCH,
};
const parser = new DOMParser();

export const getSourceType = (search: string): Source => {
  try {
    new URL(search); // verify that it is a valid url
    if (isHFYSeriesPage(search))
      return Source.HFY_SERIES;
    if (isPost(search))
      return Source.POST;
    return Source.GENERIC;
  } catch { }
  return Source.SEARCH;
};

export const getFetchUrlForSource = (source: Source, url: string): string => {
  switch (source) {
    case Source.GENERIC: return url;
    default: return toApiCall(url);
  }
};

export const requestToResource = (series: Series, res: Response): Promise<any> => {
  switch (series.type) {
    case Source.GENERIC: return res.text();
    default: return res.json();
  }
};

export const getDataFromSource = (source: Source, json: any): Bookdata | undefined => {
  switch (source) {
    case Source.HFY_SERIES:
      return getHFYSeriesPageData(json);
    case Source.POST:
      return getPostData(json);
    case Source.GENERIC:
      return getGenericData(json);
  }
  throw new Error(`Getting data from source type \`${Source[source]}\` not supported, this should never happen`);
};

export const getChapterDataFromSource = (source: Source, json: any, url: string): Chapter | undefined => {
  switch (source) {
    case Source.POST:
      return getPostContent(json);
    case Source.GENERIC:
      return getGenericContent(json, url);
  }
  throw new Error(`Getting data from source type \`${Source[source]}\` not supported, this should never happen`);
};

export const findNextLinkDefault = (html: string) => {
  const next = html.match(/href="([^"]+)"[^>]*>\s*Next/i);
  if (next) return next[1];
  const posts = [...html.matchAll(commentLinkHTML)];
  // don't use "First Chapter", "Previous Chapter" or "Index" links
  const post = posts.reverse().find(match => {
    const t = match[3].toLowerCase();
    return !t.startsWith('first') && !t.startsWith('prev') && !t.startsWith('index');
  });
  if (post) return post[1];
};
let userNextRegex: RegExp;
export const findNextLinkRegexp = (html: string) => {
  const next = html.match(userNextRegex);
  if (next && next.length > 1) return next[1];
};
let userNextFn: ReturnType<typeof sandboxFn>;
export const findNextLinkFn = (html: string) => {
  let doc: Document;
  const closure: Parameters<typeof userNextFn>[0] = {
    document: {
      get() { return doc = doc ?? parser.parseFromString(html, 'text/html'); },
      configurable: true,
    },
    html: {
      writable: false,
      value: html,
      configurable: true,
    },
  };
  return userNextFn(closure).ret;
};
export const findNextLink = (config: Config, html: string): string => {
  switch (config.nextLink) {
    case NextLinkType.DEFAULT: return findNextLinkDefault(html);
    case NextLinkType.REGEXP: return findNextLinkRegexp(html);
    case NextLinkType.FUNCTION: return findNextLinkFn(html);
  }
};

let userTransformRegex: RegExp;
export const transformChapterRegexp = (html: string) => {
  const next = html.match(userTransformRegex);
  if (next && next.length > 1) html = next[1];
  return html;
};
export const transformChapterSelector = (sel: string, html: string) => {
  return parser.parseFromString(html, 'text/html').querySelector(sel)?.innerHTML;
};
let userTransformFn: ReturnType<typeof sandboxFn>;
export const transformChapterFn = (chapter: Chapter): Chapter => {
  let doc: Document;
  const closure: Parameters<typeof userTransformFn>[0] = {
    document: {
      get() { return doc = doc ?? parser.parseFromString(chapter.content || '', 'text/html'); },
      configurable: true,
    },
    title: {
      writable: true,
      value: chapter.title,
      configurable: true,
    },
    html: {
      writable: true,
      value: chapter.content,
      configurable: true,
    },
    url: {
      writable: true,
      value: chapter.displayUrl,
      configurable: true,
    },
  };
  const { proxy } = userTransformFn(closure);
  return {
    ...chapter,
    title: isString(proxy.title) ? proxy.title : chapter.title,
    content: isString(proxy.html) ? proxy.html : chapter.content,
    displayUrl: isString(proxy.url) ? proxy.url : chapter.displayUrl,
  };
};
export const transformChapter = (config: Config, chapter: Chapter): Chapter => {
  switch (config.transform) {
    case ChapterTransformType.NONE: return { ...chapter };
    case ChapterTransformType.REGEXP: return { ...chapter, content: transformChapterRegexp(chapter.content || '') };
    case ChapterTransformType.SELECTOR: return { ...chapter, content: transformChapterSelector(config.transformSelector, chapter.content || '') };
    case ChapterTransformType.FUNCTION: return transformChapterFn(chapter);
  }
};
export const transformChapters = (config: Config, chapters: Bookdata['chapters']): Bookdata['chapters'] => chapters.map(transformChapter.bind(null, config));

config.subscribe(conf => {
  userNextRegex = new RegExp(conf.nextLinkRegex, 'i');
  userNextFn = sandboxFn(conf.nextLinkFn);
  userTransformRegex = new RegExp(conf.transformRegex, 'i');
  userTransformFn = sandboxFn(conf.transformFn);
});

export const fetchBookData = async (series: Series) => {
  const res = await retryFetch(series.url);
  const json = await requestToResource(series, res);
  if (!res.ok) throw '' + (json.message ?? json);

  const data = getDataFromSource(series.type, json);

  if (!data?.chapters?.length)
    throw new Error('No chapters found');
  return data;
};