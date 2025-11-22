import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'
import { cartKeys } from '../api/qeuryKeys'
import { CartAddRequest, CartItem, CartResponse } from '../types/cart'

// 장바구니 조회
export const useCart = <T = CartResponse>(
  options?: Omit<
    UseQueryOptions<CartResponse, Error, T>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: cartKeys.details(),
    queryFn: async () => {
      const response = await cartApi.getCart()
      if (!response || !response.data) {
        throw new Error('장바구니 데이터를 불러올 수 없습니다.')
      }
      return response.data
    },

    staleTime: 0,
    ...options,
  })
}

// 장바구니 담기
export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CartAddRequest) => cartApi.addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.details() })
    },
  })
}

// 수량 변경
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

// 삭제
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
