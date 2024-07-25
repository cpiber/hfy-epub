import { nanoid } from 'nanoid';
import { retryFetch } from '../fetch';
import { decode, redditApiBase, toApiCall } from '../util';
import { commentLink } from './re';

const seriesPageMatch = /^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/hfy\/wiki\/series\//i;

export const isSeriesPage = (search: string) => !!search.match(seriesPageMatch);

export const getSeriesPageData = ({ data: { content_md, content_html } }: reddit.wikipage): Bookdata => {
  const content = new DOMParser().parseFromString(decode(content_html), 'text/html');
  const links = content.querySelectorAll<HTMLAnchorElement>('a[href]');

  return ({
    author: content_md.match(/\[\*\*(?:Author\s*[-:]\s*)?([^*\]]+)\*\*\]|A Story By \[(?:\*\*)?([^\]]+?)(?:\*\*)?\]/i).slice(1).find(Boolean)?.trim(),
    title: content_md.match(/##?\s*\*\*(.+)\*\*/)?.[1]?.trim(),
    chapters: Array.from(links).filter(n => n.getAttribute('href').match(commentLink)).map(n => {
      const url = n.getAttribute('href').startsWith('http') ? n.getAttribute('href') : `https://www.reddit.com${n.getAttribute('href')}`;
      return ({
        id: nanoid(), // posts from here should be overwritten later when fetching, but we need an id before that or in case the user edits
        title: n.textContent.trim(),
        apiUrl: toApiCall(url),
        displayUrl: url,
      });
    })
  });
};

export const getAllSeries = async (search?: string) => {
  const res = await retryFetch(`https://${redditApiBase}/r/hfy/wiki/series.json`);
  const json = await res.json();
  if (!res.ok) throw json.message;
  const content = json.data.content_md;
  const all = [...content.matchAll(/\[([^\]]+)\]\s*\(((?:https?:\/\/(?:[^.]+\.)?reddit\.com)?\/r\/hfy\/wiki\/series\/[^)]+)\)\s*(?:\[\*([^\]]+)\*\])?/igm)].map(matches => ({
    title: matches[1],
    author: matches[3],
    url: toApiCall(matches[2].startsWith('http') ? matches[2] : `https://${redditApiBase}${matches[2]}`),
  }));

  if (!search) return all;
  const searchSmall = search.toLowerCase();
  return all.filter(s => s.title.toLowerCase().indexOf(searchSmall) !== -1);
};