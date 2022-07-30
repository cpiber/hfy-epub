import { writable } from 'svelte/store';
import { getSourceType, Source } from './sources';
import { toApiCall } from './util';

export enum Stage {
  INPUT,
  SEARCH,

  BOOK_DATA,
  EDIT_DATA,
  FIND_CHAPTERS,
  DOWNLOAD_CHAPTERS,

  RESULT,

  SETTINGS,
};
export abstract class StageData {
  stage: Stage;
  from?: StageData;
  abstract next(...args: any[]): StageData;
}
type StageDataCtor = { new(...a: any[]): StageData; };
export type StageStore = {
  stage: StageData;
  search?: string;
  series?: Series;
};

export class Input extends StageData {
  stage: Stage.INPUT = Stage.INPUT;
  next(search: string): StageData {
    const input = getSourceType(search);
    store.update(s => ({ ...s, search, series: input !== Source.SEARCH ? { url: toApiCall(search), type: input } : s.series }));
    switch (input) {
      case Source.SEARCH:
        return next(this, Search);
      default:
        return next(this, BookData);
    }
  }
}
export class Search extends StageData {
  stage: Stage.SEARCH = Stage.SEARCH;
  next(series: Series): StageData {
    store.update(s => ({ ...s, series }));
    return next(this, BookData);
  }
}
export class BookData extends StageData {
  stage: Stage.BOOK_DATA = Stage.BOOK_DATA;
  constructor(public bookData: Immutable<Bookdata> = undefined, public newChapters: number = undefined) { super(); }
  next(data: Bookdata): StageData { return next(this, Result, data); }
  edit(data: Bookdata) { return next(this, EditData, data); }
  findMore(data: Bookdata) { return next(this, FindChapters, data); }
  downloadAll(data: Bookdata) { return next(this, DownloadChapters, data); }
}
export class EditData extends StageData {
  stage: Stage.EDIT_DATA = Stage.EDIT_DATA;
  constructor(public bookData: Immutable<Bookdata>) { super(); }
  next(data: Bookdata): StageData { return next(this, BookData, data); }
}
export class FindChapters extends StageData {
  stage: Stage.FIND_CHAPTERS = Stage.FIND_CHAPTERS;
  constructor(public bookData: Immutable<Bookdata>) { super(); }
  next(data: Bookdata, n: number): StageData { return next(this, BookData, data, n); }
}
export class DownloadChapters extends StageData {
  stage: Stage.DOWNLOAD_CHAPTERS = Stage.DOWNLOAD_CHAPTERS;
  constructor(public bookData: Immutable<Bookdata>) { super(); }
  next(data: Bookdata): StageData { return next(this, BookData, data); }
}
export class Result extends StageData {
  stage: Stage.RESULT = Stage.RESULT;
  constructor(public bookData: Immutable<Bookdata>) { super(); }
  next(): StageData { return next(this, BookData, this.bookData); }
}
export class Settings extends StageData {
  stage: Stage.SETTINGS = Stage.SETTINGS;
  next(): StageData { return back(this); }
}

const StageMapping = {
  [Stage.INPUT]: Input,
  [Stage.SEARCH]: Search,
  [Stage.BOOK_DATA]: BookData,
  [Stage.EDIT_DATA]: EditData,
  [Stage.FIND_CHAPTERS]: FindChapters,
  [Stage.DOWNLOAD_CHAPTERS]: DownloadChapters,
  [Stage.RESULT]: Result,
  [Stage.SETTINGS]: Settings,
} as const;
export function next<T extends StageDataCtor>(from: StageData, typ: T, ...args: ConstructorParameters<T>) {
  const n = new typ(...args);
  n.from = from;
  store.update(s => ({ ...s, stage: n }));
  return n;
};
export function back(from: StageData) {
  store.update(s => ({ ...s, stage: from.from }));
  return from.from;
}
export function is<S extends Stage, T extends (typeof StageMapping)[S]>(stage: StageData, type: S): stage is InstanceType<T> {
  return !!stage && stage.stage === type;
}
export const store = writable<StageStore>({ stage: new Input() });