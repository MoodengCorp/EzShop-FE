import { ApiResponse, OrdersData } from '@/types/api'
import { apiClient } from '@/lib/api/client'

export async function fetchOrders(period: string): Promise<ApiResponse<OrdersData>> {
  try {
    // 원래 토큰 꺼내와서 넣어야 함
    return await apiClient<ApiResponse<OrdersData>>(
      `api/orders?period=${period}`,
      {
        method: 'GET',
        token: undefined,
      }
    )
  } catch (error){
    return {
      success: false,
      error: {
        code: '400',
        message: '뭔가 에러가 났다.'
      }
    }
  }
}