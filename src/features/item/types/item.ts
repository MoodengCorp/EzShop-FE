// 아이템 상태 타입
export type ItemStatus = 'ACTIVE' | 'SOLDOUT' | 'HIDDEN'
export type deliveryType = 'FAST' | 'NORMAL'

export interface Item {
  itemId: number
  categoryId: number
  name: string
  price: number
  thumbnailUrl: string
}

// 아이템 상세 조회 응답
export interface ItemDetailResponse {
  itemId: number
  catergoryId: number
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
  categoryId: number
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
