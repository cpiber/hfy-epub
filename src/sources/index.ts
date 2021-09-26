import { isSeriesPage as isHFYSeriesPage } from './hfy';

export { getSeriesPageData as getHFYSeriesPageData } from './hfy';

export enum Source {
  HFY_SERIES,
  SEARCH,
};

export const getSourceType = (search: string): Source => {
  try {
    new URL(search);
    if (isHFYSeriesPage(search))
      return Source.HFY_SERIES;
    throw new Error('Not any known url');
  } catch {
    return Source.SEARCH;
  }
}