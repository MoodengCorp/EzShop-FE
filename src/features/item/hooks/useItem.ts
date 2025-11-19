import { useMutation, useQuery } from '@tanstack/react-query'
import { itemKeys } from '../api/queryKeys'
import { itemApi } from '../api/itemApi'
import { ItemCreateRequest } from '../types/item'

export const useItemsQuery = () => {
  return useQuery({
    queryKey: itemKeys.details(),
    queryFn: itemApi.getItems,
  })
}

// B. 상품 상세 조회 Hook
export const useItemDetailQuery = (itemId: number) => {
  return useQuery({
    // itemId가 유효할 때만 쿼리 실행
    queryKey: itemKeys.detail(itemId),
    queryFn: () => itemApi.getItemDetail(itemId),
    enabled: !!itemId,
  })
}

// C. 상품 생성 Mutation Hook
export const useCreateItemMutation = () => {
  // 생성 후 리스트나 다른 캐시를 무효화할 수 있으나, 여기서는 간단히 구현합니다.
  return useMutation({
    mutationFn: itemApi.createItem,
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
    // }
  })
}

export const useUpdateItemMutation = () => {
  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: number
      data: Partial<ItemCreateRequest>
    }) => itemApi.updateItem(itemId, data),
  })
}
