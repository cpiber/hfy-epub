import { nanoid } from 'nanoid';
import { stringToDocument } from '../util';

export const getGenericData = (content: string): Bookdata => {
  const doc = stringToDocument(content);
  return {
    title: doc.title,
    author: 'unkown',
    chapters: Array.from(doc.querySelectorAll<HTMLAnchorElement>('ul a, ol a')).map(item => ({
      displayUrl: item.href,
      apiUrl: item.href,
      id: nanoid(),
      title: item.textContent,
    })),
  };
};