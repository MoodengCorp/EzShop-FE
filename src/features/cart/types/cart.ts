// src/features/cart/types/cart.ts

/**
 * 장바구니 아이템
 * ✅ 백엔드 CartItemResponseDto와 일치 (checked는 UI 전용)
 */
export interface CartItem {
  cartItemId: number      // ✅ 장바구니 항목 ID (명확하게 구분)
  itemId: number          // ✅ 실제 상품 ID
  name: string
  price: number
  quantity: number
  thumbnailUrl: string
  checked: boolean        // UI 전용 (API 요청 시 제외)
}

/**
 * 장바구니 추가 요청
 * ✅ 백엔드 CartAddRequestDto와 일치
 */
export interface CartAddRequest {
  itemId: number
  quantity: number
}

/**
 * 장바구니 수량 변경 요청
 * ✅ 백엔드 CartUpdateQuantityRequestDto와 일치
 */
export interface CartUpdateQuantityRequest {
  quantity: number
}

/**
 * 장바구니 응답
 * ✅ 백엔드 CartResponseDto와 일치
 */
export interface CartResponse {
  cartItems: CartItem[]
  totalPrice: number
  totalCount: number
}
