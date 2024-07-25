import { writable } from 'svelte/store';
import { getFetchUrlForSource, getSourceType, Source } from './sources';

export enum Stage {
  INPUT,
  SEARCH,

  BOOK_DATA,
  EDIT_DATA,
  FIND_CHAPTERS,
  DOWNLOAD_CHAPTERS,

  RESULT,

  SETTINGS,
  _404,
};
const toUrl = (stage: Stage) => stage === Stage.INPUT ? __webpack_public_path__ : `${__webpack_public_path__}${Stage[stage].toLowerCase().replace(/_/g, '-')}`;
export abstract class StageData {
  stage: Stage;
  from?: StageData;
  needsSaving?: boolean;
  abstract next(...args: any[]): void;
  dump(): any[] { return []; }
}
type StageDataCtor = { new(...a: any[]): StageData; };
export type StageStore = {
  stage: StageData;
  search?: string;
  series?: Series;
};

export class Input extends StageData {
  stage: Stage.INPUT = Stage.INPUT;
  next(search: string) {
    const input = getSourceType(search);
    console.debug('Input', search, 'resulted in type', input);
    store.update(s => ({ ...s, search, series: input !== Source.SEARCH ? { url: getFetchUrlForSource(input, search), type: input } : s.series }));
    switch (input) {
      case Source.SEARCH:
        return next(Search);
      default:
        return next(BookData);
    }
  }
}
export class Search extends StageData {
  stage: Stage.SEARCH = Stage.SEARCH;
  next(series: Series) {
    store.update(s => ({ ...s, series }));
    return next(BookData);
  }
}
export class BookData extends StageData {
  stage: Stage.BOOK_DATA = Stage.BOOK_DATA;
  constructor(public bookData: Immutable<Bookdata> = undefined, public newChapters: number = undefined) { super(); }
  next(data: Bookdata) { return next(Result, data); }
  edit(data: Bookdata) { return next(EditData, data); }
  findMore(data: Bookdata) { return next(FindChapters, data); }
  downloadAll(data: Bookdata) { return next(DownloadChapters, data); }
  dump(): any[] { return [this.bookData, this.newChapters]; }
}
export class EditData extends StageData {
  stage: Stage.EDIT_DATA = Stage.EDIT_DATA;
  needsSaving = true;
  constructor(public bookData: Immutable<Bookdata>) { super(); if (!bookData) throw new Error('bookData must be defined'); }
  next(data: Bookdata) { return next(BookData, data); }
  dump(): any[] { return [this.bookData]; }
}
export class FindChapters extends StageData {
  stage: Stage.FIND_CHAPTERS = Stage.FIND_CHAPTERS;
  needsSaving = true;
  constructor(public bookData: Immutable<Bookdata>) { super(); if (!bookData) throw new Error('bookData must be defined'); }
  next(data: Bookdata, n: number) { return next(BookData, data, n); }
  dump(): any[] { return [this.bookData]; }
}
export class DownloadChapters extends StageData {
  stage: Stage.DOWNLOAD_CHAPTERS = Stage.DOWNLOAD_CHAPTERS;
  needsSaving = true;
  constructor(public bookData: Immutable<Bookdata>) { super(); if (!bookData) throw new Error('bookData must be defined'); }
  next(data: Bookdata) { return next(BookData, data); }
  dump(): any[] { return [this.bookData]; }
}
export class Result extends StageData {
  stage: Stage.RESULT = Stage.RESULT;
  constructor(public bookData: Immutable<Bookdata>) { super(); if (!bookData) throw new Error('bookData must be defined'); }
  next() { return next(BookData, this.bookData); }
  dump(): any[] { return [this.bookData]; }
}
export class Settings extends StageData {
  stage: Stage.SETTINGS = Stage.SETTINGS;
  next() { return back(); }
}
export class _404 extends StageData {
  stage: Stage._404 = Stage._404;
  next() { return back(); }
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
  [Stage._404]: _404,
} as const;
export function next<T extends StageDataCtor>(typ: T, ...args: ConstructorParameters<T>) {
  store.update(s => {
    const n = new typ(...args);
    n.from = s.stage;
    try {
      history.pushState({ data: n.dump(), search: s.search, series: s.series }, '', toUrl(n.stage));
    } catch {
      history.pushState({ data: [], search: s.search, series: s.series }, '', toUrl(n.stage));
      console.error('Data too large! Caution, forwards/backwards won\'t work as expected!');
    }
    return { ...s, stage: n };
  });
};
function nextFromEnum(typ: Stage, { data, search, series }: { data?: any[], search?: string, series?: Series; } = {}) {
  data = data || [];
  store.update(s => {
    try {
      // @ts-ignore
      const n = new StageMapping[typ](...data);
      if (n.stage === s.stage.stage) return s; // no need to move if already here
      n.from = s.stage;
      return { ...s, search, series, stage: n };
    } catch (e) {
      console.group('Failed to update page');
      console.error(e);
      console.log('Parameters:', typ, data, search);
      console.groupEnd();
      history.pushState({ data: [], search: s.search, series: s.series }, '', '/');
      return s;
    }
  });
}
export function back() {
  history.back();
}
export function is<S extends Stage, T extends (typeof StageMapping)[S]>(stage: StageData, type: S): stage is InstanceType<T> {
  return !!stage && stage.stage === type;
}
export const store = writable<StageStore>({ stage: new Input() });

const pathRegex = new RegExp('^' + __webpack_public_path__.replace('/', '\/'));
export const loadFromHistory = () => {
  window.removeEventListener('popstate', handlePopState);
  window.addEventListener('popstate', handlePopState);
  handlePopState();
};
const loadStateFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('state'));
  } catch {
    return undefined;
  }
};
const handlePopState = () => {
  const path = location.pathname.replace(pathRegex, '').split('/')[0] || '';
  if (path.length > 60) return;
  if (path === "") return nextFromEnum(Stage.INPUT);
  const stage = path.toUpperCase().replace(/-/g, '_');
  const state = history.state || loadStateFromLocalStorage() || {};
  if (stage in Stage) return nextFromEnum(Stage[stage as keyof typeof Stage], state);
  return nextFromEnum(Stage._404);
};