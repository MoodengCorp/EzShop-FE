import { apiClient } from '@/lib/apiClient'
import { Item, ItemDetailResponse} from '../types/item'

export const itemApi = {
    getItemDetail: async (itemId: number): Promise<ItemDetailResponse> => {
    return apiClient.get<ItemDetailResponse>(`/item/${itemId}`);
  },

}