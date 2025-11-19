import { apiClient } from '@/lib/apiClient'
import {
  CartResponse,
  CartAddRequest,
  CartUpdateQuantityRequest,
} from '../types/cart'

// API Functions
export const cartApi = {
  // 조회
  getCart: async (): Promise<CartResponse> => {
    return apiClient.get<CartResponse>('/cart')
  },

  // 추가
  addToCart: async (data: CartAddRequest): Promise<void> => {
    return apiClient.post('/cart', data)
  },

  // 수량 변경 (PATCH)
  updateQuantity: async (
    cartItemId: number,
    quantity: number,
  ): Promise<void> => {
    const payload: CartUpdateQuantityRequest = { quantity }
    return apiClient.patch(`/cart/${cartItemId}`, payload)
  },

  // 삭제 (DELETE)
  removeCartItem: async (cartItemId: number): Promise<void> => {
    return apiClient.delete(`/cart/${cartItemId}`)
  },
}
