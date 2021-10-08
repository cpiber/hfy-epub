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

interface Chapter {
  title: string,
  content: string,
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