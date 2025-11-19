// 아이템 상태 타입
export type ItemStatus = 'ACTIVE' | 'SOLDOUT' | 'HIDDEN'
export type deliveryType = 'FAST' | 'NORMAL'

export interface Item {
  itemId: number
  categoryName: string
  name: string
  price: number
  thumbnailUrl: string
}

// 아이템 상세 조회 응답
export interface ItemDetailResponse {
  itemId: number
  categoryName: string
  name: string
  origin: string
  deliveryType: deliveryType
  packagingType: string
  price: number
  salesUnit: string
  weight: number
  stockQuantity: number
  detailImageUrl: string
  thumbnailUrl: string
}

export interface ItemCreateRequest {
  categoryName: string
  name: string
  origin: string
  deliveryType: deliveryType
  packagingType: string
  price: number
  salesUnit: string
  weight: number
  stockQuantity: number
  detailImageUrl: string
  thumbnailUrl: string
}
