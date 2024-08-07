import { nanoid } from 'nanoid';
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
  stage: Stage = Stage.INPUT;
  from?: StageData;
  needsSaving?: boolean;
  abstract next(...args: any[]): void;
  dump(): any[] { return []; }
}
type StageDataCtor = { new(...a: any[]): StageData; };
export type StageStore = {
  stage: StageData;
  search?: string;
  series: Series;
};

export class Input extends StageData {
  stage: Stage.INPUT = Stage.INPUT;
  next(search: string) {
    const input = getSourceType(search);
    console.debug('Input', search, 'resulted in type', input);
    store.update(s => ({ ...s, search, series: input !== Source.SEARCH ? { url: getFetchUrlForSource(input, search), type: input } : s.series }));
    bookDataStore.update(() => undefined);
    switch (input) {
      case Source.SEARCH:
        return next(Search);
      default:
        return next(BookData);
    }
  }
  fromList(list: string) {
    const urls = list.split('\n');
    store.update(s => ({ ...s, series: { url: urls[0], type: Source.GENERIC } }));
    bookDataStore.update(() => ({ author: 'unknown', title: 'unknown', chapters: urls.map((u, i) => ({ apiUrl: u, id: nanoid(), title: `Chapter ${i}`, displayUrl: u, })) }));
    return next(BookData);
  }
  fromJSON({ series, bookData }: { series: Series, bookData: Bookdata; }) {
    store.update(s => ({ ...s, series }));
    bookDataStore.update(() => bookData);
    return next(BookData);
  }
}
export class Search extends StageData {
  stage: Stage.SEARCH = Stage.SEARCH;
  next(series: Series) {
    store.update(s => ({ ...s, series }));
    bookDataStore.update(() => undefined);
    return next(BookData);
  }
}
export class BookData extends StageData {
  stage: Stage.BOOK_DATA = Stage.BOOK_DATA;
  constructor(public newChapters: number | undefined = undefined) { super(); }
  next() { return next(Result); }
  edit() { return next(EditData); }
  findMore() { return next(FindChapters); }
  downloadAll() { return next(DownloadChapters); }
  dump(): any[] { return [this.newChapters]; }
}
export class EditData extends StageData {
  stage: Stage.EDIT_DATA = Stage.EDIT_DATA;
  needsSaving = true;
  next(data: Bookdata) { bookDataStore.update(() => data); return next(BookData); }
  fetch(data: Bookdata) { bookDataStore.update(() => data); return next(DownloadChapters); }
}
export class FindChapters extends StageData {
  stage: Stage.FIND_CHAPTERS = Stage.FIND_CHAPTERS;
  needsSaving = true;
  next(data: Bookdata, n: number) { bookDataStore.update(() => data); return next(BookData, n); }
}
export class DownloadChapters extends StageData {
  stage: Stage.DOWNLOAD_CHAPTERS = Stage.DOWNLOAD_CHAPTERS;
  needsSaving = true;
  next(data: Bookdata) { bookDataStore.update(() => data); return next(BookData); }
}
export class Result extends StageData {
  stage: Stage.RESULT = Stage.RESULT;
  next() { return next(BookData); }
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
    const data = n.dump();
    try {
      if (n.stage === Stage.SETTINGS) {
        history.pushState({ data: data, search: s.search, series: s.series }, '', toUrl(n.stage));
      } else {
        history.replaceState({ data: data, search: s.search, series: s.series }, '', toUrl(n.stage));
      }
    } catch {
      console.error('Data too large! Caution, forwards/backwards won\'t work as expected!');
      if (data.length > 0) data[0] = undefined;
      if (n.stage === Stage.SETTINGS) {
        history.pushState({ data: data, search: s.search, series: s.series }, '', toUrl(n.stage));
      } else {
        history.replaceState({ data: data, search: s.search, series: s.series }, '', toUrl(n.stage));
      }
    }
    // @ts-expect-error
    return { ...s, stage: n, lastBookData: typ.usesBookData ? n.bookData as Bookdata : s.lastBookData };
  });
};
function nextFromEnum(typ: Stage, { data, search, series }: { data?: any[], search?: string, series: Series; } = { series: { type: Source.GENERIC, url: '' } }) {
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
export function is<S extends Stage, T extends (typeof StageMapping)[S]>(stage: StageData | undefined, type: S): stage is InstanceType<T> {
  return !!stage && stage.stage === type;
}
export const store = writable<StageStore>({ stage: new Input(), series: { type: Source.GENERIC, url: '' } });
export const bookDataStore = writable<Bookdata | undefined>(undefined);

const pathRegex = new RegExp('^' + __webpack_public_path__.replace('/', '\/'));
export const loadFromHistory = () => {
  window.removeEventListener('popstate', handlePopState);
  window.addEventListener('popstate', handlePopState);
  handlePopState();
};
export const loadBookData = () => {
  try {
    const bookData = bookDataFromJSON(localStorage.getItem('book') ?? '');
    bookDataStore.update(() => bookData);
  } catch (err) {
    console.error(err);
  }
};
const loadStateFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('state') ?? '');
  } catch {
    return undefined;
  }
};
const handlePopState = () => {
  const path = location.pathname.replace(pathRegex, '').split('/')[0] || '';
  if (path.length > 60) return;
  if (path === "") return nextFromEnum(Stage.INPUT);
  const stage = path.toUpperCase().replace(/-/g, '_');
  const localState = loadStateFromLocalStorage();
  const state = { ...localState, ...(history.state || {}) };
  if (stage in Stage) return nextFromEnum(Stage[stage as keyof typeof Stage], state);
  return nextFromEnum(Stage._404);
};

export const bookDataFromObject = (intermediate: Bookdata & { cover?: { name: string, data: number[]; }; }) => {
  const data: Bookdata = { ...intermediate, cover: undefined };
  if (intermediate.cover) {
    data.cover = new File([new Uint8Array(intermediate.cover.data)], intermediate.cover.name);
  }
  return data;
};
export const bookDataFromJSON = (input: string) => {
  const intermediate: Bookdata & { cover?: { name: string, data: number[]; }; } = JSON.parse(input);
  return bookDataFromObject(intermediate);
};

export const bookDataToObject = async (data: Bookdata) => {
  const intermediate: Bookdata | { cover?: { name: string, data: number[]; }; } = { ...data, cover: undefined };
  if (data.cover) {
    const buffer = await data.cover.arrayBuffer();
    intermediate.cover = {
      name: data.cover.name,
      data: Array.from(new Uint8Array(buffer)),
    };
  }
  return intermediate;
};
export const bookDataToJSON = async (data?: Bookdata): Promise<string> => {
  if (!data) return 'undefined';
  return JSON.stringify(await bookDataToObject(data));
};