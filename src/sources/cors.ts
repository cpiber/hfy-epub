import { nanoid } from 'nanoid';
import { stringToDocument } from '../util';

export const getGenericContent = (content: string, url: string): Chapter => {
  const doc = stringToDocument(content);
  return {
    id: nanoid(),
    apiUrl: url,
    displayUrl: url,
    title: doc.title,
    content: doc.body.innerHTML,
    needsFetching: false,
  };
};
export const getGenericData = (content: string): Bookdata => {
  const doc = stringToDocument(content);
  return {
    title: doc.title,
    author: 'unknown',
    chapters: Array.from(doc.querySelectorAll<HTMLAnchorElement>('ul a, ol a')).map(item => ({
      displayUrl: item.href,
      apiUrl: item.href,
      id: nanoid(),
      title: item.innerHTML,
    })),
  };
};