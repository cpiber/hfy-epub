import { decode, toApiCall } from '../util';

const postMatch = /^https?:\/\/(?:[^.]+\.)?reddit\.com\/r\/([^/]+)\/comments\//i;

export const isPost = (search: string) => !!search.match(postMatch);

export const getPostContent = (json: reddit.post): Chapter =>
({
  id: json[0].data.children[0].data.id,
  title: (json[0].data.children[0].data.title),
  content: decode(json[0].data.children[0].data.selftext_html),
  apiUrl: toApiCall(json[0].data.children[0].data.url),
  displayUrl: json[0].data.children[0].data.url,
  needsFetching: false,
});
export const getPostData = (json: reddit.post): Bookdata =>
({
  author: json[0].data.children[0].data.author,
  title: (json[0].data.children[0].data.title),
  chapters: [getPostContent(json)],
});