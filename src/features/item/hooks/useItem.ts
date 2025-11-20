import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { itemKeys } from '../api/queryKeys'
import { itemApi } from '../api/itemApi'
import { ItemSearchParams } from '../types/item'

// 파라미터를 받는 형태로 수정
export const useItems = (params?: ItemSearchParams) => {
  return useQuery({
    queryKey: itemKeys.list(params),
    queryFn: () => itemApi.getItems(params),
    placeholderData: keepPreviousData,
  })
}
// 상품 상세 조회 Hook
export const useItemDetailQuery = (itemId: number) => {
  return useQuery({
    // itemId가 유효할 때만 쿼리 실행
    queryKey: itemKeys.detail(itemId),
    queryFn: () => itemApi.getItemDetail(itemId),
    enabled: !!itemId,
  })
}
