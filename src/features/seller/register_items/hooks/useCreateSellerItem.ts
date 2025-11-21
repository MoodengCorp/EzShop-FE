import { useMutation } from '@tanstack/react-query'
import { registerItemApi } from '@/features/seller/register_items/api/registerItemApi'

export function useCreateSellerItem() {
  return useMutation({
    mutationFn: registerItemApi.create,
  })
}