import { DeliveryType } from '@/features/item/types/item'

/**
 * 장바구니 아이템
 */
export interface CartItem {
  cartItemId: number
  itemId: number
  name: string
  price: number
  quantity: number
  thumbnailUrl: string
  deliveryType: DeliveryType
  checked: boolean // UI 전용 (API 요청 시 제외)
}

export interface CartResponse {
  cartId: number
  totalPrice: number
  totalCount: number // 헤더 장바구니 최종 갯수 표시하기 위함
  items: CartItem[]
}
/**
 * 장바구니 추가 요청
 */
export interface CartAddRequest {
  itemId: number
  quantity: number
}

/**
 * 장바구니 수량 변경 요청
 */
export interface CartUpdateRequest {
  cartItemId: number
  count: number
}

export interface CartDeleteRequest {
  cartItemIds: number[]
}
