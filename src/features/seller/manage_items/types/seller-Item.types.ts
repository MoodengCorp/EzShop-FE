// src/features/orders/types/seller-order.types.ts
import { PaginationDto } from '@/types/common'
import { ItemDetailResponse, ItemStatus } from '@/features/item/types/item'

/**
 * 판매자 주문 검색 파라미터
 */
export interface SellerItemSearchParams {
  keyword?: string
  categoryName? : string
  page: number
  perPage: number
  itemStatus?: ItemStatus
}

/**
 * 판매자 주문 검색 응답
 * ✅ 백엔드 ItemSearchResponseDto와 유사한 구조
 */
export interface SellerItemSearchResponse {
  items: ItemDetailResponse[]
  pagination: PaginationDto
}

/**
 * 주문 상태별 카운트
 */
export interface ItemStatusCounts {
  ALL: number
  ACTIVE: number
  SOLDOUT: number
  HIDDEN: number
}