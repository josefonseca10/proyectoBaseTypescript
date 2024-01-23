export interface PaginatedResult<T> {
  items: T[];
  meta: {
    totalCount: number;
    currentPage: number;
    perPage: number;
  };
}
