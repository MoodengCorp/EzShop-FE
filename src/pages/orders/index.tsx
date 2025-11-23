import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import PaymentSummary from '@/components/common/PaymentSummary'
import OrderCTA from '@/components/common/OrderCTA'

import OrderComplete from '@/features/orders/components/OrderComplete'

import { OrderCreateResponse } from '@/features/orders/types/order'

import { useCart } from '@/features/cart/hooks/useCart'
import { useCreateOrder } from '@/features/orders/hooks/useOrders'
import { useUserProfile } from '@/features/user/hooks/useUserProfile'
import { CartResponse } from '@/features/cart/types/cart'
import { OrderCreateRequest } from '@/features/orders/types/order'

export default function OrderPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [completedOrder, setCompletedOrder] =
    useState<OrderCreateResponse | null>(null)
  const { items: itemIdsString } = router.query

  const { data: cartData, isLoading: isCartLoading } = useCart<CartResponse>({
    enabled: router.isReady && !!itemIdsString && !completedOrder,
    staleTime: 1000 * 60,
  })

  // 없으면 우선 0으로 설정했는데, 이 부분 논의 필요
  const cartId = cartData?.cartId || 0

  const orderItems = useMemo(() => {
    if (!cartData || !itemIdsString || typeof itemIdsString !== 'string')
      return []

    const targetIds = itemIdsString.split(',').map(Number)

    return cartData.items.filter((item) =>
      targetIds.includes(item.cartItemId),
    )
  }, [cartData, itemIdsString])

  const { mutate: createOrder, isPending: isOrderPending } = useCreateOrder()
  const { data: userInfoResponse } = useUserProfile()

  const [senderName, setSenderName] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [deliveryRequest, setDeliveryRequest] = useState('')

  useEffect(() => {
    if (userInfoResponse && userInfoResponse.data) {
      const user = userInfoResponse.data
      setSenderName(user.name)
      setSenderPhone(user.phone)
      setSenderEmail(user.email)
      setAddress(user.address || '')
      setAddressDetail(user.addressDetail || '')
    }
  }, [userInfoResponse])

  const totalPrice = useMemo(() => {
    return orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [orderItems])

  const handlePayment = () => {
    if (!senderName || !senderPhone || !address) {
      alert('필수 배송 정보를 입력해주세요.')
      return
    }

    if (orderItems.length === 0) {
      alert('주문할 상품 정보가 없습니다.')
      return
    }

    const orderRequest: OrderCreateRequest = {
      cartId: cartId,
      totalPrice,
      recipientName: senderName,
      recipientPhone: senderPhone,
      address: address,
      addressDetail: addressDetail,
      deliveryRequest,
      orderItemInfo: orderItems.map((item) => ({
        cartItemId: item.cartItemId,
        itemId: item.itemId,
        price: item.price,
        quantity: item.quantity,
      })),
    }

    createOrder(orderRequest, {
      onSuccess: (response) => {
        const createdOrder = response.data
        if (!createdOrder) {
          console.error('주문은 성공했으나 데이터가 없습니다.')
          return
        }
        setCompletedOrder(createdOrder)
        window.scrollTo(0, 0)
      },
      onError: (error) => {
        console.error(error)
        alert('결제 요청 중 오류가 발생했습니다.')
      },
    })
  }

  useEffect(() => {
    if (router.isReady && !itemIdsString && !completedOrder) {
      alert('잘못된 접근입니다. 장바구니로 이동합니다.')
      router.replace('/cart')
    }
  }, [router.isReady, itemIdsString, completedOrder, router])

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto flex w-[1050px] items-center justify-center pb-[100px] pt-12">
          <OrderComplete orderData={completedOrder} />
        </div>
      </div>
    )
  }

  const InfoRow = ({
    label,
    children,
  }: {
    label: string
    children: React.ReactNode
  }) => (
    <div className="flex items-start py-4">
      <div className="w-[140px] shrink-0 pt-1 leading-6 text-[#666]">
        {label}
      </div>
      <div className="flex-1 font-medium leading-6 text-[#333]">{children}</div>
    </div>
  )

  if (!router.isReady || isCartLoading)
    return <div className="py-40 text-center">주문서 생성 중...</div>

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-[1050px] pb-[100px] pt-12 font-sans text-[#333]">
        <div className="mb-12 text-center text-[28px] font-bold">주문서</div>

        <div className="relative flex justify-between gap-[60px]">
          <div className="w-full flex-1">
            <section className="mb-14">
              <div className="mb-2 border-b border-[#333] pb-4 text-[20px] font-semibold text-[#333]">
                주문자 정보
              </div>
              <div className="divide-y divide-[#f4f4f4] border-b border-[#f4f4f4]">
                <InfoRow label="보내는 분">{senderName}</InfoRow>
                <InfoRow label="휴대폰">{senderPhone}</InfoRow>
                <InfoRow label="이메일">{senderEmail}</InfoRow>
              </div>
            </section>

            <section className="mb-14">
              <div className="mb-2 border-b border-[#333] pb-4 text-[20px] font-semibold text-[#333]">
                배송 정보
              </div>
              <div className="divide-y divide-[#f4f4f4] border-b border-[#f4f4f4]">
                <InfoRow label="배송지">
                  <div>
                    {address} {addressDetail}
                    <span className="ml-2 rounded-sm bg-purple-50 px-2 py-0.5 align-middle text-xs text-[#5f0080]">
                      기본배송지
                    </span>
                  </div>
                </InfoRow>
                <div className="flex items-center py-4">
                  <div className="w-[140px] shrink-0 text-[#666]">
                    배송 요청사항
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="문 앞 위탁 장소 등을 입력해주세요"
                      value={deliveryRequest}
                      onChange={(e) => setDeliveryRequest(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="border-b border-[#333] pb-4 text-[20px] font-semibold text-[#333]">
                주문상품
              </div>
              <div className="divide-y divide-[#f4f4f4] border-b border-[#f4f4f4]">
                {orderItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center gap-5 py-5"
                  >
                    <div className="flex h-[78px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded bg-gray-50">
                      {item.thumbnailUrl ? (
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.name}
                          width={60}
                          height={78}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-300">No Img</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-[16px] font-medium leading-6 text-[#333]">
                        {item.name}
                      </p>
                      <div className="mt-1 text-[14px] text-[#888]">
                        수량 {item.quantity}개
                      </div>
                    </div>
                    <div className="text-[16px] font-bold text-[#333]">
                      {(item.price * item.quantity).toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="w-[375px] shrink-0">
            <div className="sticky top-[80px] flex flex-col gap-5">
              <PaymentSummary itemsSubtotal={totalPrice} />
              <OrderCTA
                amount={totalPrice}
                disabled={isOrderPending || orderItems.length === 0}
                onClick={handlePayment}
              />
              <div className="rounded-lg bg-[#f7f7f7] p-3 px-2 text-[12px] leading-5 text-[#666]">
                <ul className="list-disc space-y-1 pl-4 text-[#888]">
                  <li>[주문완료] 상태일 경우에만 주문 취소가 가능합니다.</li>
                  <li>미성년자가 결제 시 법정대리인이 취소할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
