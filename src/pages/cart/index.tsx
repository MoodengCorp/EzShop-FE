import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import CartItem from '@/features/cart/components/CartItem'
import PaymentSummary from '@/components/common/PaymentSummary'
import OrderCTA from '@/components/common/OrderCTA'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import AddressCard from '@/components/common/AddressCard'

import {
  useCart,
  useUpdateCartQuantity,
  useRemoveCartItem,
} from '@/features/cart/hooks/useCart'
import { CartItem as CartItemType } from '@/features/cart/types/cart'

export default function CartPage() {
  const router = useRouter()

  const { data, isLoading } = useCart()

  const cartItems = useMemo(() => {
    if (!data) return []
    return data.items
  }, [data])

  const { mutate: updateQuantity } = useUpdateCartQuantity()
  const { mutate: removeItem } = useRemoveCartItem()

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (cartItems.length > 0 && !isInitialized) {
      const allIds = cartItems.map((item) => item.cartItemId)
      setSelectedIds(new Set(allIds))
      setIsInitialized(true)
    }
  }, [cartItems, isInitialized])

  const handleToggle = (id: number, checked: boolean) => {
    const newSet = new Set(selectedIds)
    if (checked) newSet.add(id)
    else newSet.delete(id)
    setSelectedIds(newSet)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(cartItems.map((i) => i.cartItemId)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectGroup = (items: CartItemType[], checked: boolean) => {
    const newSet = new Set(selectedIds)
    items.forEach((item) => {
      if (checked) {
        newSet.add(item.cartItemId)
      } else {
        newSet.delete(item.cartItemId)
      }
    })
    setSelectedIds(newSet)
  }

  const handleChangeQty = (cartItemId: number, quantity: number) => {
    if (quantity < 1) return

    updateQuantity({
      cartItemId,
      quantity: quantity,
    })
  }

  const handleRemove = (cartItemId: number) => {
    if (confirm('해당 상품을 장바구니에서 삭제하시겠습니까?')) {
      removeItem([cartItemId])
      const newSelected = new Set(selectedIds)
      newSelected.delete(cartItemId)
      setSelectedIds(newSelected)
    }
  }

  const handleRemoveSelected = () => {
    if (selectedIds.size === 0) return
    if (confirm(`선택한 ${selectedIds.size}개 상품을 삭제하시겠습니까?`)) {
      removeItem(Array.from(selectedIds))
      setSelectedIds(new Set())
    }
  }

  const handleOrder = () => {
    if (selectedIds.size === 0) {
      alert('주문할 상품을 선택해주세요.')
      return
    }
    const itemsParam = Array.from(selectedIds).join(',')
    router.push({
      pathname: '/orders',
      query: { items: itemsParam },
    })
  }

  const { totalPrice, totalCount } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        if (selectedIds.has(item.cartItemId)) {
          acc.totalPrice += item.price * item.quantity
          acc.totalCount += 1
        }
        return acc
      },
      { totalPrice: 0, totalCount: 0 },
    )
  }, [cartItems, selectedIds])

  const groupedItems = useMemo(() => {
    const fastItems = cartItems.filter((item) => item.deliveryType === 'FAST')
    const normalItems = cartItems.filter(
      (item) => item.deliveryType === 'NORMAL',
    )
    return { fastItems, normalItems }
  }, [cartItems])

  if (isLoading)
    return <div className="py-40 text-center">장바구니를 불러오는 중...</div>

  return (
    <div className="min-h-screen bg-[#f2f5f8]">
      <div className="mx-auto w-[1050px] pb-[100px] pt-12 font-sans text-[#333]">
        <h2 className="mb-12 text-center text-[28px] font-bold">장바구니</h2>

        {cartItems.length === 0 ? (
          <div className="flex h-[300px] flex-col items-center justify-center gap-5 rounded-xl bg-white text-center shadow-sm">
            <p className="text-[16px] text-[#999]">
              장바구니에 담긴 상품이 없습니다.
            </p>
            <Link href="/">
              <Button className="bg-deepBlue px-8 hover:bg-[#006CB4]">
                상품 담으러 가기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-between gap-[24px]">
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
                {/* 전체 선택 헤더 */}
                <div className="flex items-center justify-between rounded-t-xl border-b border-[#f4f4f4] bg-white px-4 py-4">
                  <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium">
                    <Checkbox
                      checked={
                        selectedIds.size === cartItems.length &&
                        cartItems.length > 0
                      }
                      onCheckedChange={(v) => handleSelectAll(Boolean(v))}
                      className="h-6 w-6 border-gray-300 data-[state=checked]:border-deepBlue data-[state=checked]:bg-deepBlue"
                    />
                    <span className="text-[16px] font-bold leading-none">
                      전체선택 ({selectedIds.size}/{cartItems.length})
                    </span>
                  </label>

                  <button
                    onClick={handleRemoveSelected}
                    className="rounded-[4px] border border-[#ddd] bg-white px-3 py-[6px] text-[14px] font-medium text-[#333] hover:bg-gray-50"
                  >
                    선택삭제
                  </button>
                </div>

                {/* 상품 리스트 */}
                <div className="flex flex-col">
                  {/* 샛별배송 */}
                  {groupedItems.fastItems.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 border-b border-[#f4f4f4] bg-white px-4 py-4">
                        <label className="flex cursor-pointer select-none items-center gap-2">
                          <Checkbox
                            checked={
                              groupedItems.fastItems.length > 0 &&
                              groupedItems.fastItems.every((item) =>
                                selectedIds.has(item.cartItemId),
                              )
                            }
                            onCheckedChange={(v) =>
                              handleSelectGroup(
                                groupedItems.fastItems,
                                Boolean(v),
                              )
                            }
                            className="h-6 w-6 border-gray-300 data-[state=checked]:border-deepBlue data-[state=checked]:bg-deepBlue"
                          />
                          <span className="text-[16px] font-bold text-[#333]">
                            샛별배송
                          </span>
                        </label>
                      </div>

                      {groupedItems.fastItems.map((item) => (
                        <div key={item.cartItemId}>
                          <CartItem
                            item={{
                              ...item,
                              checked: selectedIds.has(item.cartItemId),
                            }}
                            onToggle={handleToggle}
                            onChangeQty={handleChangeQty}
                            onRemove={handleRemove}
                            className="border-b border-[#f4f4f4]"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 일반배송 */}
                  {groupedItems.normalItems.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 border-b border-[#f4f4f4] bg-white px-4 py-4">
                        <label className="flex cursor-pointer select-none items-center gap-2">
                          <Checkbox
                            checked={
                              groupedItems.normalItems.length > 0 &&
                              groupedItems.normalItems.every((item) =>
                                selectedIds.has(item.cartItemId),
                              )
                            }
                            onCheckedChange={(v) =>
                              handleSelectGroup(
                                groupedItems.normalItems,
                                Boolean(v),
                              )
                            }
                            className="h-6 w-6 border-gray-300 data-[state=checked]:border-deepBlue data-[state=checked]:bg-deepBlue"
                          />
                          <span className="text-[16px] font-bold text-[#333]">
                            일반배송
                          </span>
                        </label>
                      </div>

                      {groupedItems.normalItems.map((item) => (
                        <div key={item.cartItemId}>
                          <CartItem
                            item={{
                              ...item,
                              checked: selectedIds.has(item.cartItemId),
                            }}
                            onToggle={handleToggle}
                            onChangeQty={handleChangeQty}
                            onRemove={handleRemove}
                            className="border-b border-[#f4f4f4]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 요약 바 */}
                <div className="rounded-b-xl border-t border-[#f4f4f4] bg-white p-4">
                  <div className="flex flex-col items-center justify-center rounded-[10px] bg-[#f7f7f7] py-4 text-center">
                    <div className="mb-2 flex items-center text-base font-medium text-[#666]">
                      <span>상품 {totalPrice.toLocaleString()}원</span>
                      <span className="mx-2 text-base font-light">+</span>
                      <span>배송비 0 원</span>
                    </div>
                    <div className="text-lg font-bold text-[#333]">
                      {totalPrice.toLocaleString()} 원
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[375px] shrink-0">
              <div className="sticky top-[72px] flex flex-col gap-4">
                <AddressCard />
                <PaymentSummary itemsSubtotal={totalPrice} />
                <OrderCTA
                  amount={totalPrice}
                  disabled={totalCount === 0}
                  onClick={handleOrder}
                />
                <div className="px-2 text-[12px] leading-5 text-[#666]">
                  <ul className="list-disc pl-4">
                    <li>[주문완료] 상태일 경우에만 주문 취소가 가능합니다.</li>
                    <li>
                      [마이페이지 &gt; 주문내역 상세페이지] 에서 직접 취소하실
                      수 있습니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
