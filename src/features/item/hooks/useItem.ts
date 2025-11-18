import { useQuery } from '@tanstack/react-query'
import { itemKeys } from '@/features/item/api/queryKeys'
import type { ItemDetailResponse } from '@/features/item/types/item'
import { MOCK_ITEMS_DETAIL } from '@/mocks/items' // 목데이터 import
// import { itemApi } from '@/features/item/api/itemApi' // 나중에 실제 API 연결할 때 사용

export function useItemDetail(
  itemId?: number,
  options?: any, // 타입을 복잡하게 잡기보다 일단 any나 Omit으로 유연하게 둡니다.
) {
  return useQuery<ItemDetailResponse>({
    // 1. Query Key: itemId가 없으면 0을 넣지만, enabled false라 실행되진 않음
    queryKey: itemKeys.detail(itemId ?? 0),

    // 2. Query Function: 목데이터 찾아서 반환
    queryFn: async () => {
      // (선택사항) 실제 API처럼 약간의 로딩 딜레이(0.5초) 추가
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 목데이터 배열에서 ID로 검색
      const foundItem = MOCK_ITEMS_DETAIL.find((item) => item.itemId === itemId)

      if (!foundItem) {
        throw new Error('상품을 찾을 수 없습니다.')
      }

      return foundItem

      /* --- [나중에 실제 API 연결 시 사용할 코드] 
      const res = await itemApi.getItemDetail(Number(itemId))
      return res
      */
    },

    enabled: typeof itemId === 'number' && !Number.isNaN(itemId), // ID가 유효한 숫자일 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    ...options,
  })
}
