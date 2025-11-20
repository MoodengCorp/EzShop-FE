import {
  ItemStatusCounts,
  SellerItemSearchParams,
  SellerItemSearchResponse,
} from '@/features/seller/manage_items/types/seller-Item.types'
import { getMockSellerItemsResponse, MOCK_ITEM_STATUS_COUNTS, MOCK_ITEMS_DETAIL } from '@/mocks/items'
import { ItemDetailResponse, ItemStatus } from '@/features/item/types/item'
import { ApiResponse } from '@/types/api'

export const sellerItemsApi = {
  /**
   * 판매자 판매 상품 목록 조회
   */
  getSellerItems: async (params: SellerItemSearchParams): Promise<SellerItemSearchResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return getMockSellerItemsResponse(params.page, params.perPage)
    // ✅ 백엔드 준비되면 아래 주석 해제
    // const queryParams: Record<string, string | number | boolean | undefined> = {
    //   keyword: params.keyword,
    //   categoryName: params.categoryName,
    //   page: params.page,
    //   perPage: params.perPage,
    //   itemStatus: params.itemStatus,
    // }
    //
    // const response = await apiClient.get<ApiResponse<SellerItemSearchResponse>>(
    //   '/item/my',
    //   { params: queryParams }
    // )
    //
    // return response.data!
  },

  /**
   * 상품 상태별 카운트 조회
   */
  getItemStatusCounts: async (): Promise<ItemStatusCounts> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    return await new Promise((resolve) => setTimeout(resolve, 300))
      .then(() => {
        return MOCK_ITEM_STATUS_COUNTS
      })
    // ✅ 백엔드 준비되면 아래 주석 해제
    // const response = await apiClient.get<ApiResponse<ItemStatusCounts>>(
    //   '/item/seller/status-counts'
    // )
    // return response.data!
  },

  /**
   * 상품 상세 정보 조회
   */
  getItemDetail: async (itemId: number): Promise<ItemDetailResponse> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    await new Promise((resolve) => setTimeout(resolve, 300))
    const mockItem = MOCK_ITEMS_DETAIL.find((item) => item.itemId === itemId)
    if (!mockItem) {
      throw new Error('상품을 찾을 수 없습니다.')
    }
    return mockItem

    // ✅ 백엔드 준비되면 아래 주석 해제
    // const response = await apiClient.get<ApiResponse<ItemDetailResponse>>(
    //   `/item/${itemId}`
    // )
    // return response.data!
  },

  /**
   * 상품 정보 수정 (이미지 포함)
   */
  updateItem: async (itemId: number, formData: FormData): Promise<void> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('상품 수정:', itemId, formData)

    // ✅ 백엔드 준비되면 아래 주석 해제
    // await apiClient.put<ApiResponse<void>>(
    //   `/item/${itemId}`,
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    // )
  },

  /**
   * 상품 상태 변경
   */
  updateItemStatus: async (itemId: number, status: ItemStatus): Promise<void> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('상품 상태 변경:', itemId, status)

    // ✅ 백엔드 준비되면 아래 주석 해제
    // await apiClient.patch<ApiResponse<void>>(
    //   `/item/${itemId}/status`,
    //   { itemStatus: status }
    // )
  },

  /**
   * 상품 삭제
   */
  deleteItem: async (itemId: number): Promise<void> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('상품 삭제:', itemId)

    // ✅ 백엔드 준비되면 아래 주석 해제
    // await apiClient.delete<ApiResponse<void>>(
    //   `/item/${itemId}`
    // )
  },
}