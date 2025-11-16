// src/types/common.ts
// 프로젝트 전역에서 사용되는 공통 타입

/**
 * 페이지네이션 정보
 */
export interface Pagination {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
}

/**
 * 정렬 옵션
 */
export type SortOrder = 'asc' | 'desc'

/**
 * 날짜 범위
 */
export interface DateRange {
  startDate: string
  endDate: string
}

/**
 * 선택 옵션 (드롭다운 등에서 사용)
 */
export interface SelectOption<T = string> {
  label: string
  value: T
}