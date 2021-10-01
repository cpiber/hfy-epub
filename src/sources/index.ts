import { retryFetch } from '../fetch';
import { getSeriesPageData as getHFYSeriesPageData, isSeriesPage as isHFYSeriesPage } from './hfy';
import { getPostData, isPost } from './post';

export { getPostContent } from './post';

export enum Source {
  HFY_SERIES,
  POST,
  SEARCH,
};

export const getSourceType = (search: string): Source => {
  try {
    new URL(search);
    if (isHFYSeriesPage(search))
      return Source.HFY_SERIES;
    if (isPost(search))
      return Source.POST;
  } catch {}
  return Source.SEARCH;
};

export const getDataFromSource = (source: Source, json: any): Bookdata | undefined => {
  switch (source) {
    case Source.HFY_SERIES:
      return getHFYSeriesPageData(json);
    case Source.POST:
      return getPostData(json);
  }
};

export const findNextLink = (html: string) => {
  const next = html.match(/href="([^"]+)"[^>]*>\s*Next/i);
  if (next) return next[1];
  const posts = [...html.matchAll(/href="((?:https?:\/\/(?:[^.]+\.)?reddit\.com)\/r\/[^\/]+\/comments\/[^"]+)"[^>]*>\s*([^<]+)/ig)];
  // don't use "First Chapter", "Previous Chapter" or "Index" links
  const post = posts.reverse().find(match => {
    const t = match[2].toLowerCase();
    return !t.startsWith('first') && !t.startsWith('prev') && !t.startsWith('index');
  });
  if (post) return post[1];
}

export const fetchBookData = async (series: Series) => {
  const res = await retryFetch(series.url);
  const json = await res.json();
  if (!res.ok) throw json.message;

  const data = getDataFromSource(series.type, json);

  if (!data || !data.chapters || !data.chapters.length)
    throw new Error('No chapters found');
  return data;
};