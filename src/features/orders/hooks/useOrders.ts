// src/hooks/useOrders.ts
import { ApiError } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { mockOrderDetails } from '@/mocks/OrderData'
import { OrderPeriod } from '@/features/orders/types/order'
import { ordersApi } from '@/features/orders/api/ordersApi'

/**
 * 주문 목록 조회 훅
 */
export const useOrders = (period: OrderPeriod) => {
  return useQuery({
    queryKey: ['orders', period],
    queryFn: async () => {
      return await ordersApi.getOrders(period)
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
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockData

      // ✅ 백엔드 준비되면 아래 코드로 교체
      // return await ordersApi.getOrderDetail(orderId)
    },
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  })
}