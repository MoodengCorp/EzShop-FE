import { apiClient } from '@/lib/apiClient'
import {
  Order,
  OrderCreateRequest,
  OrderCreateResponse,
  OrderDetail,
  OrderPeriod,
} from '../types/order'
import { ApiResponse } from '@/types'

export const ordersApi = {
  getOrders: async (
    period: OrderPeriod,
    searchQuery?: string,
  ): Promise<ApiResponse<Order[]>> => {
    const params: Record<string, string> = { period }
    if (searchQuery) params.search = searchQuery
    return apiClient.get<ApiResponse<Order[]>>('/orders/my', { params })
  },

  getOrderDetail: async (
    orderId: string,
  ): Promise<ApiResponse<OrderDetail>> => {
    return apiClient.get<ApiResponse<OrderDetail>>(`/orders/my/${orderId}`)
  },

  createOrder: async (
    data: OrderCreateRequest,
  ): Promise<ApiResponse<OrderCreateResponse>> => {
    return apiClient.post<ApiResponse<OrderCreateResponse>>('/orders', data)
  },
}
