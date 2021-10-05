import { toApiCall } from '../util';
import { commentLinkMD } from './re';

const seriesPageMatch = /^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/hfy\/wiki\/series\//i;

export const isSeriesPage = (search: string) => !!search.match(seriesPageMatch);

export const getSeriesPageData = (json: reddit.wikipage) => 
  ({
    author: json.data.content_md.match(/\[\*\*([^*\]]+)\*\*\]|A Story By \[(?:\*\*)?([^\]]+?)(?:\*\*)?\]/i).slice(1).find(Boolean),
    title: json.data.content_md.match(/##?\s*\*\*(.+)\*\*/)?.[1],
    chapters: [...json.data.content_md.matchAll(commentLinkMD)].map(matches => ({
      title: matches[1],
      url: toApiCall(matches[2].startsWith('http') ? matches[2] : `https://api.reddit.com${matches[2]}`),
    }))
  });