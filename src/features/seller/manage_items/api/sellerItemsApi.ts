import {
  ItemStatusCounts,
  SellerItemSearchParams,
  SellerItemSearchResponse,
} from '@/features/seller/manage_items/types/seller-Item.types'
import { ItemDetailResponse, ItemStatus } from '@/features/item/types/item'
import { ApiResponse } from '@/types/api'
import { apiClient } from '@/lib/apiClient'

export const sellerItemsApi = {
  /**
   * 판매자 판매 상품 목록 조회
   */
  getSellerItems: async (
    params: SellerItemSearchParams,
  ): Promise<SellerItemSearchResponse> => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
      keyword: params.keyword,
      categoryName: params.categoryName,
      page: params.page,
      perPage: params.perPage,
      itemStatus: params.itemStatus,
    }

    const response = await apiClient.get<ApiResponse<SellerItemSearchResponse>>(
      '/item/my',
      { params: queryParams },
    )
    console.log(response)

    return response.data!
  },

  /**
   * 상품 상태별 카운트 조회
   */
  getItemStatusCounts: async (): Promise<ItemStatusCounts> => {
    const response = await apiClient.get<ApiResponse<ItemStatusCounts>>(
      '/item/seller/status-counts',
    )
    return response.data!
  },

  /**
   * 상품 상세 정보 조회
   */
  getItemDetail: async (itemId: number): Promise<ItemDetailResponse> => {
    const response = await apiClient.get<ApiResponse<ItemDetailResponse>>(
      `/item/${itemId}`,
    )
    return response.data!
  },

  /**
   * 상품 정보 수정 (이미지 포함)
   */
  updateItem: async (itemId: number, formData: FormData): Promise<void> => {
    const response = await apiClient.put<ApiResponse<void>>(`/item/${itemId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data!
  },

  /**
   * 상품 상태 변경
   */
  updateItemStatus: async (
    itemId: number,
    status: ItemStatus,
  ): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>(`/item/${itemId}/status`, {
      itemStatus: status,
    })
    return response.data!
  },

  /**
   * 상품 삭제
   */
  // deleteItem: async (itemId: number): Promise<void> => {
  //   await apiClient.delete<ApiResponse<void>>(`/item/${itemId}`)
  // },
}
