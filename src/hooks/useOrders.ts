// src/hooks/useOrders.ts
import { ApiError, OrderPeriod } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { fetchOrderDetail, fetchOrders } from '@/lib/api/orders'

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

      // ✅ data가 없으면 에러 (상세 정보는 필수)
      if (!response.data) {
        throw new ApiError(
          response.statusCode,
          response.error ||
          {
            type: 'NOT_FOUND',
            message: '주문 정보를 찾을 수 없습니다.',
          }
        )
      }

      return response.data
    },
    enabled: !!orderId, // ✅ orderId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000,
  })
}