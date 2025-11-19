import { apiClient } from '@/lib/apiClient'
import {
  CartResponse,
  CartAddRequest,
  CartUpdateRequest,
  CartDeleteRequest,
} from '../types/cart'
import { ApiResponse } from '@/types'

export const cartApi = {
  // 조회
  getCart: async (): Promise<ApiResponse<CartResponse>> => {
    return apiClient.get<ApiResponse<CartResponse>>('/cart')
  },

  // 추가
  addToCart: async (data: CartAddRequest): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>('/cart', data)
  },

  // 수량 변경
  updateQuantity: async (
    cartItemId: number,
    count: number,
  ): Promise<ApiResponse<void>> => {
    const payload: CartUpdateRequest = { cartItemId, count }
    return apiClient.patch<ApiResponse<void>>(`/cart`, payload)
  },

  // 삭제
  removeCartItem: async (cartItemIds: number[]): Promise<ApiResponse<void>> => {
    const payload: CartDeleteRequest = { cartItemIds }
    return apiClient.delete<ApiResponse<void>>(`/cart`, { data: payload })
  },
}
