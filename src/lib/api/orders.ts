import { ApiResponse, Order, OrdersData } from '@/types/api'
import { apiClient } from '@/lib/api/client'

export async function fetchOrders(period: string): Promise<ApiResponse<OrdersData>> {
  try {
    // 원래 토큰 꺼내와서 넣어야 함
    // const token = typeof window !== 'undefined'
    //   ? localStorage.getItem('accessToken')
    //   : null

    return await apiClient<ApiResponse<OrdersData>>(
      `api/orders?period=${period}`,
      {
        method: 'GET',
        token: undefined,
      },
    )
  } catch (error) {
    return {
      success: false,
      error: {
        code: '400',
        message: '뭔가 에러가 났다.',
      },
    }
  }
}

// 주문 상세 조회
export async function fetchOrderDetail(orderId: string): Promise<ApiResponse<Order>> {
  try {
    return await apiClient<ApiResponse<Order>>(
      `/api/orders/${orderId}`,
      { method: 'GET', token: undefined },
    )
  } catch (error){
    return {
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: "주문 상세 정보를 불러오는데 실패했습니다."
      }
    }
  }
}