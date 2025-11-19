import { apiClient } from '@/lib/apiClient'
import { Item, ItemCreateRequest, ItemDetailResponse } from '../types/item'

export const itemApi = {
  // A. 상품 리스트 조회
  getItems: async (): Promise<Item[]> => {
    // 필터/페이지네이션 옵션이 있다면 여기에 params를 추가해야 합니다.
    return apiClient.get<Item[]>('/items')
  },

  // B. 상품 상세 조회
  getItemDetail: async (itemId: number): Promise<ItemDetailResponse> => {
    return apiClient.get<ItemDetailResponse>(`/items/${itemId}`)
  },

  // C. 상품 생성
  createItem: async (data: ItemCreateRequest): Promise<void> => {
    // 생성 후 응답 데이터가 필요하면 Promise<Item> 등으로 수정합니다.
    return apiClient.post('/items', data)
  },

  // D. 상품 수정 (예시)
  updateItem: async (
    itemId: number,
    data: Partial<ItemCreateRequest>,
  ): Promise<void> => {
    return apiClient.patch(`/items/${itemId}`, data)
  },
}
