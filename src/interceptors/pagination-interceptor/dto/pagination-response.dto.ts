export class PaginationResponseDto {
  totalCount: number;

  pageSize: number;

  currentPage: number;

  nextPage: number | null;

  hasNext: boolean;

  lastPage: number;

  // 타입지정 불가
  // [key: string]: unknown[];

  constructor(
    res: { [key: string]: unknown[] },
    pageInfo: {
      totalCount: number;
      pageSize: number;
      currentPage: number;
      nextPage: number | null;
      hasNext: boolean;
      lastPage: number;
    },
  ) {
    Object.assign(this, Object.assign(res, pageInfo));
  }
}
