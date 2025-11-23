import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SellerItemSearchParams } from '@/features/seller/manage_items/types/seller-Item.types'
import { sellerItemKeys } from '@/features/seller/manage_items/api/queryKeys'
import { sellerItemsApi } from '@/features/seller/manage_items/api/sellerItemsApi'
import { ItemStatus } from '@/features/item/types/item'

/**
 * 판매자 상품 목록 조회
 */
export function useSellerItems(params: SellerItemSearchParams) {
  return useQuery({
    queryKey: sellerItemKeys.list(params),
    queryFn: () => sellerItemsApi.getSellerItems(params),
  })
}

/**
 * 상품 상태별 카운트 조회
 */
export function useItemStatusCounts() {
  return useQuery({
    queryKey: sellerItemKeys.statusCounts(),
    queryFn: sellerItemsApi.getItemStatusCounts,
  })
}

/**
 * 상품 상세 정보 조회
 */
export function useItemDetail(itemId: number | null) {
  return useQuery({
    queryKey: sellerItemKeys.detail(itemId!),
    queryFn: () => sellerItemsApi.getItemDetail(itemId!),
    enabled: itemId !== null,
  })
}

/**
 * 상품 정보 수정
 */
export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, formData }: { itemId: number; formData: FormData }) =>
      sellerItemsApi.updateItem(itemId, formData),
    onSuccess: () => {
      // 상품 목록 및 카운트 재조회
      queryClient.invalidateQueries({ queryKey: sellerItemKeys.lists() })
      queryClient.invalidateQueries({ queryKey: sellerItemKeys.statusCounts() })
      queryClient.invalidateQueries({ queryKey: sellerItemKeys.details() })
    },
  })
}

/**
 * 상품 상태 변경
 */
export function useUpdateItemStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, status }: { itemId: number; status: ItemStatus }) =>
      sellerItemsApi.updateItemStatus(itemId, status),
    onSuccess: () => {
      // 상품 목록 및 카운트 재조회
      queryClient.invalidateQueries({ queryKey: sellerItemKeys.lists() })
      queryClient.invalidateQueries({ queryKey: sellerItemKeys.statusCounts() })
      queryClient.invalidateQueries({ queryKey: sellerItemKeys.details() })
    },
  })
}

/**
 * 상품 삭제
 * 상품 삭제로 인한 사이드 이펙트의 예외 처리를 구현하지 않았기 때문에
 * 삭제 기능은 제외
 */
// export function useDeleteItem() {
//   const queryClient = useQueryClient()
//
//   return useMutation({
//     mutationFn: (itemId: number) => sellerItemsApi.deleteItem(itemId),
//     onSuccess: () => {
//       // 상품 목록 및 카운트 재조회
//       queryClient.invalidateQueries({ queryKey: sellerItemKeys.lists() })
//       queryClient.invalidateQueries({ queryKey: sellerItemKeys.statusCounts() })
//     },
//   })
// }