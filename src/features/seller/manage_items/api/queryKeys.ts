import { SellerItemSearchParams } from '@/features/seller/manage_items/types/seller-Item.types'

export const sellerItemKeys = {
  all: ['sellerItems'] as const,
  lists: () => [...sellerItemKeys.all, 'list'] as const,
  list: (filters: SellerItemSearchParams) => [...sellerItemKeys.lists(), filters] as const,
  statusCounts: () => [...sellerItemKeys.all, 'statusCounts'] as const,
  details: () => [...sellerItemKeys.all, 'detail'] as const,
  detail: (itemId: number) => [...sellerItemKeys.details(), itemId] as const,
}