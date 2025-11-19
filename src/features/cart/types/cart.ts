/**
 * 장바구니 아이템
 */
export interface CartItem {
  cartItemId: number // ✅ 장바구니 항목 ID (명확하게 구분)
  itemId: number // ✅ 실제 상품 ID
  cartId: number
  name: string
  price: number
  quantity: number
  thumbnailUrl: string
  checked: boolean // UI 전용 (API 요청 시 제외)
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
export interface CartUpdateQuantityRequest {
  quantity: number
}

/**
 * 장바구니 응답
 */
export interface CartResponse {
  cartItems: CartItem[]
  totalPrice: number
  totalCount: number
}
