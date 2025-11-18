import { useQuery } from '@tanstack/react-query'
import { itemKeys } from '@/features/item/api/queryKeys'
import { MOCK_ITEMS_DETAIL } from '@/mocks/items'
// import { itemApi } from '@/features/item/api/itemApi'

export const useItemDetail = (itemId?: number) => {
  return useQuery({
    queryKey: itemKeys.detail(itemId ?? 0),
    queryFn: async () => {
      // Mock 데이터로 테스트 (백엔드 준비 전)
      // 실제 API 호출 대신 MOCK_ITEMS_DETAIL 사용
      await new Promise((resolve) => setTimeout(resolve, 500))

      const foundItem = MOCK_ITEMS_DETAIL.find((item) => item.itemId === itemId)
      if (!foundItem) {
        throw new Error('상품을 찾을 수 없습니다.')
      }

      return foundItem

      // 백엔드 준비되면 아래 코드로 교체
      // return await itemApi.getItemDetail(Number(itemId))
    },
    enabled: !!itemId,
    staleTime: 5 * 60 * 1000, // 5분
  })
}
