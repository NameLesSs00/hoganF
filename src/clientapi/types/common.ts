export interface PagedResult<T> {
  items: T[] | null;
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface LocalizedString {
  en: string;
  ar: string;
}
