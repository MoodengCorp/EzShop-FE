// src/features/orders/api/sellerOrdersApi.ts
import { apiClient } from '@/lib/apiClient'
import { SellerOrderSearchParams, SellerOrderSearchResponse, OrderStatusCounts } from '../types/seller-order.types'
import { ApiResponse } from '@/types/api'
import { getMockSellerOrdersResponse, MOCK_ORDER_STATUS_COUNTS } from '@/mocks/SellerOrders'

export const sellerOrdersApi = {
  /**
   * 판매자 주문 목록 조회
   */
  getSellerOrders: async (
    params: SellerOrderSearchParams
  ): Promise<SellerOrderSearchResponse> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    await new Promise((resolve) => setTimeout(resolve, 500)) // 로딩 시뮬레이션
    return getMockSellerOrdersResponse(params.page, params.perPage)

    // ✅ 백엔드 준비되면 아래 주석 해제
    // const queryParams: Record<string, string | number | boolean | undefined> = {
    //   page: params.page,
    //   perPage: params.perPage,
    //   status: params.status,
    //   startDate: params.startDate,
    //   endDate: params.endDate,
    //   itemName: params.itemName,
    //   buyerName: params.buyerName,
    // }
    //
    // const response = await apiClient.get<ApiResponse<SellerOrderSearchResponse>>(
    //   '/seller/orders',
    //   { params: queryParams }
    // )
    //
    // return response.data!
  },

  /**
   * 주문 상태별 카운트 조회
   */
  getOrderStatusCounts: async (): Promise<OrderStatusCounts> => {
    // 🔧 목 데이터 사용 (백엔드 준비 전)
    await new Promise((resolve) => setTimeout(resolve, 300)) // 로딩 시뮬레이션
    return MOCK_ORDER_STATUS_COUNTS

    // ✅ 백엔드 준비되면 아래 주석 해제
    // const response = await apiClient.get<ApiResponse<OrderStatusCounts>>(
    //   '/seller/orders/status-counts'
    // )
    // return response.data!
  },
}