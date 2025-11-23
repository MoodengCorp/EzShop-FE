// src/hooks/useOrders.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { OrderCreateRequest, OrderPeriod } from '@/features/orders/types/order'
import { ordersApi } from '@/features/orders/api/ordersApi'
import { mockOrderDetails } from '@/mocks/OrderData'
import { orderKeys } from '@/features/orders/api/queryKeys'

/**
 * 주문 목록 조회 훅
 */
export const useOrders = (period: OrderPeriod, search: string = '') => {
  return useQuery({
    queryKey: orderKeys.list(period, search),
    queryFn: async () => {
      return (await ordersApi.getOrders(period)) || []
    },
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * 주문 상세 조회 훅
 */
export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: orderKeys.detail(parseInt(orderId)),
    queryFn: async () => {
      const id = parseInt(orderId)

      // 로딩 시뮬레이션 (500ms 대기)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockData = mockOrderDetails[22]

      // ✅ undefined가 아닌 null을 반환하거나 에러를 던지기
      if (!mockData) {
        throw new Error(`주문 정보를 찾을 수 없습니다. (orderId: ${id})`)
      }

      return mockData
      // return await ordersApi.getOrderDetail(orderId)
    },
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: OrderCreateRequest) => ordersApi.createOrder(data),
    onSuccess: () => {
      // 주문 성공 시, 주문 목록 데이터를 갱신
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
    onError: (error) => {
      console.error('주문 생성 실패:', error)
    },
  })
}
