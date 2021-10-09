declare const VERSION: string;
declare const DEV: boolean;

interface Series {
  url: string,
  type: Source,
}

interface Bookdata {
  /**
   * HTML string (as-is)
   * 
   * Needs to be unescaped once more, because it's escaped by EJS (and Svelte)
   */
  author: string,
  /**
   * HTML string (as-is)
   * 
   * Needs to be unescaped once more, because it's escaped by EJS (and Svelte)
   */
  title: string,
  chapters: Chapter[],
}

interface Chapter {
  /**
   * HTML string (as-is)
   * 
   * Needs to be unescaped once more, because it's escaped by EJS (and Svelte)
   */
  title: string,
  /**
   * HTML string (Decoded when fetching)
   * 
   * Raw HTML chapter content
   */
  content?: string, // already decoded
  url: string,
  needsFetching?: boolean,
}

type ImmutablePrimitive = undefined | null | boolean | string | number | Function;

type Immutable<T> =
    T extends ImmutablePrimitive ? T :
    T extends Array<infer U> ? ImmutableArray<U> :
    T extends Map<infer K, infer V> ? ImmutableMap<K, V> :
    T extends Set<infer M> ? ImmutableSet<M> : ImmutableObject<T>;

type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };