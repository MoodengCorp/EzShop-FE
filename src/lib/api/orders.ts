// src/lib/api/orders.ts
import { apiClient } from '@/lib/apiClient'
import {
  CreateOrderRequest,
  Order, OrderDetail,
  OrderPeriod,
} from '@/types/order'
import { ApiResponse } from '@/types/api'

/**
 * 주문 목록 조회
 * @param period - 조회 기간 (3개월, 6개월, 1년)
 */
export async function fetchOrders(
  period: OrderPeriod,
): Promise<ApiResponse<Order[]>> {
  const endpoint = `/orders?period=${encodeURIComponent(period)}`
  return apiClient.get<ApiResponse<Order[]>>(endpoint)
}

/**
 * 주문 상세 조회
 * @param orderId - 주문 ID
 */
export async function fetchOrderDetail(
  orderId: string,
): Promise<ApiResponse<OrderDetail>> {
  return apiClient.get<ApiResponse<OrderDetail>>(`/orders/${orderId}`)
}

/**
 * 주문 생성
 * @param orderData - 주문 생성 데이터 (장바구니 아이템 ID 목록, 배송 요청사항)
 */
export async function createOrder(
  orderData: CreateOrderRequest,
): Promise<ApiResponse<Order>> {
  return apiClient.post<ApiResponse<Order>>('/orders', orderData)
}