import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  OrderCreateFormData,
  OrderCreateRequest,
} from '@/features/orders/types/order'
import { useCreateOrder } from '@/features/orders/hooks/useOrders'

import PaymentSummary from '@/components/common/PaymentSummary'
import OrderCTA from '@/components/common/OrderCTA'

// [테스트용] MOCK 데이터
const MOCK_CART_DATA = {
  cartId: 999,
  totalPrice: 63454,
  items: [
    {
      cartItemId: 1,
      itemId: 101,
      name: '[겨울간식] 삼립 발효미종 야채호빵(4입)',
      price: 4704,
      quantity: 1,
      thumbnailUrl:
        'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/c4d41015-d188-4c68-b3e9-36968bf2110a.jpeg',
    },
    {
      cartItemId: 2,
      itemId: 102,
      name: '[사미헌] 갈비탕 (냉동)',
      price: 12350,
      quantity: 2,
      thumbnailUrl: '',
    },
  ],
}

type OrderFormState = Omit<OrderCreateFormData, 'cartItemIds'>

export default function OrderPage() {
  const router = useRouter()
  const { mutate: createOrder } = useCreateOrder()
  const cartData = MOCK_CART_DATA

  const [orderForm, setOrderForm] = useState<OrderFormState>({
    recipientName: '',
    recipientPhone: '',
    address: '',
    addressDetail: '',
    deliveryRequest: '',
  })

  const [isEditingRequest, setIsEditingRequest] = useState(true)

  // 초기 데이터 세팅
  useEffect(() => {
    setOrderForm({
      recipientName: '홍길동',
      recipientPhone: '010-1234-5678',
      address: '서울시 서울구 서울동',
      addressDetail: '102동 304호',
      deliveryRequest: '',
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setOrderForm((prev) => ({ ...prev, [id]: value }))
  }

  const orderItems = useMemo(() => {
    return cartData.items.map((item) => ({
      cartItemId: item.cartItemId,
      itemId: item.itemId,
      price: item.price,
      quantity: item.quantity,
    }))
  }, [cartData.items])

  const handlePayment = () => {
    if (
      !orderForm.recipientName ||
      !orderForm.recipientPhone ||
      !orderForm.address
    ) {
      alert('필수 정보를 확인해주세요.')
      return
    }

    const orderRequest: OrderCreateRequest = {
      cartId: cartData.cartId,
      totalPrice: cartData.totalPrice,
      orderItemInfo: orderItems,
      ...orderForm,
    }

    // 테스트용 로그
    console.log('Clean Order Request:', orderRequest)

    createOrder(orderRequest, {
      onSuccess: () => {
        router.push({
          pathname: '/orders/complete',
          query: {
            totalPrice: orderRequest.totalPrice,
            address: orderRequest.address,
            addressDetail: orderRequest.addressDetail,
          },
        })
      },
      onError: (err) => {
        console.error(err)
        alert('주문 생성 중 오류가 발생했습니다.')
      },
    })
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

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-[1050px] pb-[100px] pt-12 font-sans text-[#333]">
        <div className="mb-12 text-center text-[28px] font-bold">주문서</div>

        <div className="relative flex justify-between gap-[60px]">
          <div className="w-full flex-1">
            {/* 1. 주문자 정보 */}
            <section className="mb-14">
              <div className="mb-2 border-b border-[#333] pb-4 text-[20px] font-semibold text-[#333]">
                주문자 정보
              </div>
              <div className="divide-y divide-[#f4f4f4] border-b border-[#f4f4f4]">
                <InfoRow label="보내는 분">{orderForm.recipientName}</InfoRow>
                <InfoRow label="휴대폰">{orderForm.recipientPhone}</InfoRow>
              </div>
            </section>

            {/* 2. 배송 정보 */}
            <section className="mb-14">
              <div className="mb-2 border-b border-[#333] pb-4 text-[20px] font-semibold text-[#333]">
                배송 정보
              </div>
              <div className="divide-y divide-[#f4f4f4] border-b border-[#f4f4f4]">
                <InfoRow label="배송지">
                  <div>
                    {orderForm.address} {orderForm.addressDetail}
                    <span className="ml-2 rounded-sm bg-purple-50 px-2 py-0.5 align-middle text-xs text-[#5f0080]">
                      기본배송지
                    </span>
                  </div>
                </InfoRow>

                {/* 배송 요청사항 */}
                <div className="flex items-center py-4">
                  <div className="w-[140px] shrink-0 text-[#666]">
                    배송 요청사항
                  </div>
                  <div className="flex-1">
                    {isEditingRequest ? (
                      <div className="flex gap-2">
                        <Input
                          id="deliveryRequest" // id를 상태 필드명과 일치시킴
                          placeholder="배송요청사항을 적어주세요"
                          value={orderForm.deliveryRequest}
                          onChange={handleInputChange}
                          className="h-[44px] w-full border-[#ddd] focus:border-[#5f0080]"
                        />
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingRequest(false)}
                          className="h-[44px] w-[60px] border-[#ddd] font-normal text-[#666] hover:bg-gray-50"
                        >
                          완료
                        </Button>
                      </div>
                    ) : (
                      <div className="flex h-[44px] items-center justify-between">
                        <span className="pl-1 font-medium text-[#333]">
                          {orderForm.deliveryRequest || (
                            <span className="text-gray-400">요청사항 없음</span>
                          )}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditingRequest(true)}
                          className="h-[44px] w-[60px] border-[#ddd] font-normal text-[#666] hover:bg-gray-50"
                        >
                          수정
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 주문상품 */}
            <section className="mb-10">
              <div className="border-b border-[#333] pb-4 text-[20px] font-semibold text-[#333]">
                주문상품
              </div>
              <div className="divide-y divide-[#f4f4f4] border-b border-[#f4f4f4]">
                {cartData.items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center gap-5 py-5"
                  >
                    <div className="flex h-[78px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded bg-gray-50">
                      {item.thumbnailUrl ? (
                        <Image
                          src={item.thumbnailUrl}
                          alt={item.name}
                          width={56}
                          height={72}
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

          {/* 오른쪽 Sticky */}
          <div className="w-[375px] shrink-0">
            <div className="sticky top-[80px] flex flex-col gap-5">
              <PaymentSummary itemsSubtotal={cartData.totalPrice} />
              <OrderCTA
                amount={cartData.totalPrice}
                disabled={false}
                onClick={handlePayment}
              />
              <div className="rounded-lg bg-[#f7f7f7] p-3 px-2 text-[12px] leading-5 text-[#666]">
                <ul className="list-disc space-y-1 pl-4 text-[#888]">
                  <li>[주문완료] 상태일 경우에만 주문 취소가 가능합니다.</li>
                  <li>
                    미성년자가 결제 시 법정대리인이 그 거래를 취소할 수
                    있습니다.
                  </li>
                  <li>배송 불가 시 주문이 취소될 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
