import { apiClient } from '@/lib/apiClient'
import { Order, OrderDetail, OrderPeriod } from '../types/order'

export const ordersApi = {
  getOrders: async (period: OrderPeriod, searchQuery?: string): Promise<Order[]> => {
    const params: Record<string, string> = { period }
    if (searchQuery) params.search = searchQuery
    return apiClient.get<Order[]>('/orders', { params })
  },

  getOrderDetail: async (orderId: string): Promise<OrderDetail> => {
    return apiClient.get<OrderDetail>(`/orders/${orderId}`)
  },
}