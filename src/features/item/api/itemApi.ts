import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types/api'
import {
  Item,
  ItemDetailResponse,
  ItemSearchParams,
  ItemSearchResponse,
} from '../types/item'

export const itemApi = {
  getItems: async (
    params?: ItemSearchParams,
  ): Promise<ApiResponse<ItemSearchResponse>> => {
    const query: Record<string, string> = {}

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query[key] = String(value)
        }
      })
    }

    return apiClient.get('/items', { params: query })
  },

  // 상품 상세 조회
  getItemDetail: async (
    itemId: number,
  ): Promise<ApiResponse<ItemDetailResponse>> => {
    return apiClient.get<ApiResponse<ItemDetailResponse>>(`/items/${itemId}`)
  },
}
