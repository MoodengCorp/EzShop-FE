import { PaginationDto } from '@/types/common'

// 아이템 배송 타입
export type deliveryType = 'FAST' | 'NORMAL'
export type itemStatus = 'ACTIVE' | 'SOLDOUT' | 'HIDDEN'

export interface Item {
  itemId: number
  name: string
  price: number
  thumbnailUrl: string
}

// 제품 상세 목록 조회 요청 파람스
export interface ItemSearchParams {
  keyword?: string
  categoryName?: string
  filter?: string
  page?: number // 1부터 시작
  perPage?: number // 페이지 당 항목 수
  sortedType?: number // 1: 신상품, 2: 높은가격, 3: 낮은가격
}

// 제품 상세 목록 조회 응답
export interface ItemSearchResponse {
  items: Item[]
  pagination: PaginationDto
}

// 아이템 상세 조회 응답
export interface ItemDetailResponse extends Item {
  origin: string
  categoryName: string
  deliveryType: deliveryType
  itemStatus: ItemStatus
  packagingType: string
  salesUnit: string
  weight: number
  stockQuantity: number
  detailImageUrl: string
  itemStatus?: itemStatus
}
