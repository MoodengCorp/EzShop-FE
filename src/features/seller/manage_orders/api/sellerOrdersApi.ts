// src/features/orders/api/sellerOrdersApi.ts
import { apiClient } from '@/lib/apiClient'
import { SellerOrderSearchParams, SellerOrderSearchResponse, OrderStatusCounts } from '../types/seller-order.types'
import { ApiResponse } from '@/types/api'
import { OrderStatus } from '@/features/orders'

export const sellerOrdersApi = {
  /**
   * 판매자 주문 목록 조회
   */
  getSellerOrders: async (
    params: SellerOrderSearchParams
  ): Promise<SellerOrderSearchResponse> => {
    const queryParams: Record<string, string | number | boolean | undefined> = {
      page: params.page,
      perPage: params.perPage,
      status: params.status,
      startDate: params.startDate,
      endDate: params.endDate,
      itemName: params.itemName,
      buyerName: params.buyerName,
    }

    const response = await apiClient.get<ApiResponse<SellerOrderSearchResponse>>(
      '/orders/seller',
      { params: queryParams }
    )

    return response.data!
  },

  /**
   * 주문 상태별 카운트 조회
   */
  getOrderStatusCounts: async (): Promise<OrderStatusCounts> => {
    const response = await apiClient.get<ApiResponse<OrderStatusCounts>>(
      '/orders/seller/status-counts'
    )
    return response.data!
  },

  /**
   * 주문 상태 변경
   * @param orderId 주문 ID
   * @param newStatus 새로운 주문 상태
   */
  updateOrderStatus: async (
    orderId: number,
    newStatus: OrderStatus
  ): Promise<void> => {
    const response = await apiClient.patch<ApiResponse<void>>(
      `/orders/${orderId}`,
      { status: newStatus }
    )
    return response.data!
  }
}