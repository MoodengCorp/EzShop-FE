// src/hooks/useOrders.ts
import { ApiError } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { fetchOrderDetail, fetchOrders } from '@/features/orders/api/ordersApi'
import { mockOrderDetails } from '@/mocks/OrderData'
import { OrderPeriod } from '@/features/orders/types/order'

/**
 * 주문 목록 조회 훅
 */
export const useOrders = (period: OrderPeriod) => {
  return useQuery({
    queryKey: ['orders', period],
    queryFn: async () => {
      const response = await fetchOrders(period)

      // ✅ 조건문 개선: success가 false일 때만 에러
      if (!response.success) {
        throw new ApiError(
          response.statusCode,
          response.error || {
            type: 'UNKNOWN_ERROR',
            message: '주문 목록을 불러오는데 실패했습니다.',
          }
        )
      }

      // ✅ data가 없으면 빈 배열 반환 (null 대신)
      return response.data || []
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * 주문 상세 조회 훅
 */
export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId], // ✅ 상세는 'order' (단수형) 유지
    queryFn: async () => {
      // ✅ Mock 데이터로 테스트 (백엔드 준비 전)
      // 실제 API 호출 대신 mockOrderDetails 사용
      const id = parseInt(orderId)
      const mockData = mockOrderDetails[id]

      // Mock 데이터 없으면 404 에러
      if (!mockData) {
        throw new ApiError(
          404,
          {
            type: 'NOT_FOUND',
            message: '주문 정보를 찾을 수 없습니다.',
          }
        )
      }

      // 로딩 시뮬레이션 (500ms 대기)
      await new Promise(resolve => setTimeout(resolve, 500))

      return mockData

      // ✅ 백엔드 준비되면 아래 코드로 교체
      /*
      const response = await fetchOrderDetail(orderId)

      if (!response.success) {
        throw new ApiError(
          response.statusCode,
          response.error || {
            type: 'UNKNOWN_ERROR',
            message: '주문 상세 정보를 불러오는데 실패했습니다.',
          }
        )
      }

      if (!response.data) {
        throw new ApiError(
          404,
          {
            type: 'NOT_FOUND',
            message: '주문 정보를 찾을 수 없습니다.',
          }
        )
      }

      return response.data
      */
    },
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  })
}