import { SellerOrderSearchParams } from '@/features/seller/manage_orders/types/seller-order.types'
import { useQuery } from '@tanstack/react-query'
import { sellerOrderKeys } from '@/features/seller/manage_orders/api/queryKeys'
import { sellerOrdersApi } from '@/features/seller/manage_orders/api/sellerOrdersApi'

export function useSellerOrders(params: SellerOrderSearchParams) {
  return useQuery({
    queryKey: sellerOrderKeys.list(params),
    queryFn: () => sellerOrdersApi.getSellerOrders(params),
    staleTime: 5 * 60 * 1000,
  })
}

export function useOrderStatusCounts() {
  return useQuery({
    queryKey: sellerOrderKeys.statusCounts(),
    queryFn: sellerOrdersApi.getOrderStatusCounts,
    staleTime: 5 * 60 * 1000,
  })
}