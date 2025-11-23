import { PaginationDto } from '@/types/common'
import { OrderDetail, OrderStatus } from '@/features/orders'

/**
 * 판매자 주문 검색 파라미터
 */
export interface SellerOrderSearchParams {
  status?: OrderStatus
  startDate?: string
  endDate?: string
  itemName?: string
  buyerName?: string
  page: number
  perPage: number
}

/**
 * 판매자 주문 검색 응답
 * ✅ 백엔드 ItemSearchResponseDto와 유사한 구조
 */
export type SellerOrderSearchResponse = {
  sellerOrderList: OrderDetail[]
  pagination: PaginationDto
}

/**
 * 주문 상태별 카운트
 */
export interface OrderStatusCounts {
  PENDING: number
  DELIVERING: number
  DELIVERED: number
  CANCEL: number
}