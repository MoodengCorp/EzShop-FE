export interface PaginationDto {
  page: number           // 현재 페이지 (1부터 시작)
  perPage: number        // 페이지당 항목 수
  totalPage: number      // 전체 페이지 수
  totalCount: number     // 전체 항목 수
  hasNext: boolean       // 다음 페이지 존재 여부
  hasPrev: boolean       // 이전 페이지 존재 여부
}