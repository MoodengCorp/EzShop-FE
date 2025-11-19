import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import CartItem from '@/features/cart/components/CartItem'
import PaymentSummary from '@/components/common/PaymentSummary'
import OrderCTA from '@/components/common/OrderCTA'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import AddressCard from '@/components/common/AddressCard'

// import {
//   useCart,
//   useUpdateCartQuantity,
//   useRemoveCartItem,
// } from '@/features/cart/hooks/useCart'

// 테스트용 더미 데이터
const MOCK_DATA = [
  {
    cartItemId: 1,
    itemId: 101,
    name: '[겨울간식] 삼립 발효미종 야채호빵(4입)',
    thumbnailUrl:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/c4d41015-d188-4c68-b3e9-36968bf2110a.jpeg', // 혹은 로컬 이미지 경로
    price: 4704,
    quantity: 1,
  },
  {
    cartItemId: 2,
    itemId: 102,
    name: '[사미헌] 갈비탕 (냉동)',
    thumbnailUrl:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/c4d41015-d188-4c68-b3e9-36968bf2110a.jpeg',
    price: 12350,
    quantity: 2,
  },
  {
    cartItemId: 3,
    itemId: 103,
    name: '유기농 바나나 1송이',
    thumbnailUrl:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/c4d41015-d188-4c68-b3e9-36968bf2110a.jpeg',
    price: 3900,
    quantity: 1,
  },
]

export default function CartPage() {
  // 1. API Hooks 대신 로컬 State 사용 (테스트용)
  const [cartItems, setCartItems] = useState(MOCK_DATA)
  const isLoading = false // 로딩 끝난 상태 가정

  // 2. 로컬 상태: 선택된 아이템 ID 관리
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  // 초기 진입 시 '전체 선택'
  useEffect(() => {
    // 실제로는 데이터 로딩 후 실행되지만, 여기선 마운트 시 바로 실행
    if (cartItems.length > 0) {
      const allIds = cartItems.map((item) => item.cartItemId)
      setSelectedIds(new Set(allIds))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 빈 배열로 두어 마운트 시 1회만 실행 (더미라서)

  // 3. 핸들러 함수들

  // 체크박스 개별 토글
  const handleToggle = (id: number, checked: boolean) => {
    const newSet = new Set(selectedIds)
    if (checked) newSet.add(id)
    else newSet.delete(id)
    setSelectedIds(newSet)
  }

  // 전체 선택 토글
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(cartItems.map((i) => i.cartItemId)))
    } else {
      setSelectedIds(new Set())
    }
  }

  // 수량 변경 (API 대신 로컬 State 수정)
  const handleChangeQty = (cartItemId: number, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item,
      ),
    )
  }

  // 삭제 (API 대신 로컬 State 필터링)
  const handleRemove = (cartItemId: number) => {
    if (confirm('해당 상품을 장바구니에서 삭제하시겠습니까?')) {
      setCartItems((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId),
      )

      // 선택 목록에서도 제거
      const newSelected = new Set(selectedIds)
      newSelected.delete(cartItemId)
      setSelectedIds(newSelected)
    }
  }

  // 선택 삭제 (API 대신 로컬 State 필터링)
  const handleRemoveSelected = () => {
    if (selectedIds.size === 0) return
    if (confirm(`선택한 ${selectedIds.size}개 상품을 삭제하시겠습니까?`)) {
      setCartItems((prev) =>
        prev.filter((item) => !selectedIds.has(item.cartItemId)),
      )
      setSelectedIds(new Set())
    }
  }

  // 4. 가격 계산 (선택된 것만)
  const { totalProductPrice, totalCount } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        if (selectedIds.has(item.cartItemId)) {
          acc.totalProductPrice += item.price * item.quantity
          acc.totalCount += 1
        }
        return acc
      },
      { totalProductPrice: 0, totalCount: 0 },
    )
  }, [cartItems, selectedIds])

  // 배송비 정책
  const deliveryFee = 0
  //   const finalTotalPrice = totalProductPrice + deliveryFee

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
              <div className="relative rounded-xl bg-white shadow-sm">
                {/* 1. 전체 선택 바 (Sticky 적용) */}
                <div className="sticky top-[56px] z-10 flex items-center justify-between rounded-t-xl border-b border-[#f4f4f4] bg-white px-4 py-4">
                  <div className="absolute bottom-full left-0 z-0 h-[56px] w-full bg-[#f2f5f8]" />

                  <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium">
                    <Checkbox
                      checked={
                        selectedIds.size === cartItems.length &&
                        cartItems.length > 0
                      }
                      onCheckedChange={(v) => handleSelectAll(Boolean(v))}
                      className="h-6 w-6 rounded-full border-gray-300 data-[state=checked]:border-deepBlue data-[state=checked]:bg-deepBlue"
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
                {/* 2. 상품 리스트 */}
                <div className="flex flex-col">
                  {cartItems.map((item) => (
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

                {/* 3. 하단 계산 요약 바 */}
                <div className="border-t border-[#f4f4f4] p-4">
                  <div className="flex flex-col items-center justify-center rounded-[10px] bg-[#f7f7f7] py-4 text-center">
                    <div className="mb-2 flex items-center text-base font-medium text-[#666]">
                      <span>상품 {totalProductPrice.toLocaleString()}원</span>
                      <span className="text-base font-light">+</span>
                      <span>배송비 {deliveryFee.toLocaleString()}원</span>
                    </div>

                    <div className="text-lg font-bold text-[#333]">
                      {(totalProductPrice + deliveryFee).toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[375px] shrink-0">
              <div className="sticky top-[72px] flex flex-col gap-4">
                <AddressCard />

                <PaymentSummary itemsSubtotal={totalProductPrice} />

                <OrderCTA
                  amount={totalProductPrice + deliveryFee}
                  disabled={totalCount === 0}
                  onClick={() => alert('주문 페이지로 이동합니다!')}
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
