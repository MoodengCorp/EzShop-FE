import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'
import { cartKeys } from '../api/qeuryKeys'
import { CartAddRequest } from '../types/cart'

// 1. 장바구니 조회 Hook
export const useCart = () => {
  return useQuery({
    queryKey: cartKeys.details(),
    queryFn: cartApi.getCart,
    staleTime: 0, // 장바구니는 데이터가 자주 바뀔 수 있으므로 즉시 갱신 추천
  })
}

// 2. 장바구니 담기 Hook
export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CartAddRequest) => cartApi.addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.details() })
    },
  })
}

// 3. 수량 변경 Hook
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number
      quantity: number
    }) => cartApi.updateQuantity(cartItemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.details() })
    },
  })
}

// 4. 삭제 Hook
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartApi.removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.details() })
    },
    onError: (error) => {
      console.error('삭제 실패:', error)
      alert('상품 삭제에 실패했습니다.')
    },
  })
}
