declare const VERSION: string;
declare const DEV: boolean;

interface Series {
  url: string,
  type: Source,
}

interface Bookdata {
  author: string,
  title: string,
  chapters: Chapter[],
}
type FinishedBookdata = Bookdata & { chapters: Required<Chapter>[] };

interface Chapter {
  title: string,
  content?: string,
  url: string,
}