
export enum Stage {
  INPUT,
  SEARCH,

  BOOK_DATA,
  EDIT_DATA,
  FIND_CHAPTERS,
  DOWNLOAD_CHAPTERS,

  RESULT,
};
export abstract class StageData {
  stage: Stage;
  from?: StageData;
}
type StageDataCtor = { new(...a: any[]): StageData; };

export class Input extends StageData { stage: Stage.INPUT = Stage.INPUT; }
export class Search extends StageData { stage: Stage.SEARCH = Stage.SEARCH; }
export class BookData extends StageData { stage: Stage.BOOK_DATA = Stage.BOOK_DATA; constructor(public bookData: Bookdata = undefined, public newChapters: number = undefined) { super(); } }
export class EditData extends StageData { stage: Stage.EDIT_DATA = Stage.EDIT_DATA; constructor(public bookData: Bookdata) { super(); } }
export class FindChapters extends StageData { stage: Stage.FIND_CHAPTERS = Stage.FIND_CHAPTERS; constructor(public bookData: Bookdata) { super(); } }
export class DownloadChapters extends StageData { stage: Stage.DOWNLOAD_CHAPTERS = Stage.DOWNLOAD_CHAPTERS; constructor(public bookData: Bookdata) { super(); } }
export class Result extends StageData { stage: Stage.RESULT = Stage.RESULT; constructor(public bookData: Bookdata) { super(); } }

const StageMapping = {
  [Stage.INPUT]: Input,
  [Stage.SEARCH]: Search,
  [Stage.BOOK_DATA]: BookData,
  [Stage.EDIT_DATA]: EditData,
  [Stage.FIND_CHAPTERS]: FindChapters,
  [Stage.DOWNLOAD_CHAPTERS]: DownloadChapters,
  [Stage.RESULT]: Result,
} as const;
export const next = <T extends StageDataCtor>(from: StageData, typ: T, ...args: ConstructorParameters<T>) => {
  const n = new typ(...args);
  n.from = from;
  return n;
};
export function is<S extends Stage, T extends (typeof StageMapping)[S]>(stage: StageData, type: S): stage is InstanceType<T> {
  return !!stage && stage.stage === type;
}