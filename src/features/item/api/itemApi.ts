import { apiClient } from '@/lib/apiClient'
import { Item, ItemCreateRequest, ItemDetailResponse } from '../types/item'

export const itemApi = {
  // 상품 리스트 조회
  getItems: async (): Promise<Item[]> => {
    // 필터/페이지네이션 옵션이 있다면 여기에 params를 추가해야 함
    return apiClient.get<Item[]>('/items')
  },

  // 상품 상세 조회
  getItemDetail: async (itemId: number): Promise<ItemDetailResponse> => {
    return apiClient.get<ItemDetailResponse>(`/items/${itemId}`)
  },

  // 상품 생성
  createItem: async (data: ItemCreateRequest): Promise<void> => {
    return apiClient.post('/items', data)
  },

  // 상품 수정 (예시)
  updateItem: async (
    itemId: number,
    data: Partial<ItemCreateRequest>,
  ): Promise<void> => {
    return apiClient.patch(`/items/${itemId}`, data)
  },
}
