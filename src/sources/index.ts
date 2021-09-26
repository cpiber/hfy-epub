import { getSeriesPageData as getHFYSeriesPageData, isSeriesPage as isHFYSeriesPage } from './hfy';

export enum Source {
  HFY_SERIES,
  SEARCH,
};

export const getSourceType = (search: string): Source => {
  try {
    new URL(search);
    if (isHFYSeriesPage(search))
      return Source.HFY_SERIES;
  } catch {}
  return Source.SEARCH;
};

export const getDataFromSource = (source: Source, json: any): Bookdata | undefined => {
  switch (source) {
    case Source.HFY_SERIES:
      return getHFYSeriesPageData(json);
  }
};
