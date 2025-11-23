import React from 'react'
import { useRouter } from 'next/router'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderCreateResponse } from '../types/order'

interface OrderCompleteProps {
  orderData: OrderCreateResponse
}

export default function OrderComplete({ orderData }: OrderCompleteProps) {
  const router = useRouter()

  return (
    <div className="flex w-[400px] flex-col justify-center rounded-xl bg-gray-100 p-6 font-sans text-[#333]">
      <div className="mb-8 mt-8 flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-softBlue">
          <Check className="h-6 w-6 text-deepBlue" strokeWidth={3} />
        </div>
        <h2 className="text-[24px] font-bold text-deepBlue">
          주문을 완료했어요
        </h2>
      </div>

      <div className="w-full max-w-[400px] space-y-4">
        <div className="rounded-xl bg-white p-5">
          <div className="mb-4">
            <p className="mb-1 font-medium leading-relaxed text-[#333]">
              {orderData.address} {orderData.addressDetail}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#999]">
            <span>주문번호 {orderData.orderNumber}</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-5">
          <span className="font-bold text-[#333]">주문 금액</span>
          <span className="text-[20px] font-bold text-[#333]">
            {orderData.totalPrice.toLocaleString()}원
          </span>
        </div>

        <div className="py-2 text-[12px] leading-5 text-[#999]">
          <ul className="list-disc space-y-1 pl-4">
            <li>배송완료 알림 메시지는 샛별배송 상품에 한해서만 발송됩니다.</li>
            <li>
              [주문완료], [배송준비중] 상태일 경우에만 주문내역 상세페이지에서
              주문 취소가 가능합니다.
            </li>
            <li>
              엘리베이터 이용이 어려운 경우 6층 이상부터는 공동 현관 앞 또는
              경비실로 대응 배송 될 수 있습니다.
            </li>
            <li>
              실제 출입 정보가 다를 경우, 부득이하게 1층 공동현관 앞 또는 경비실
              앞에 배송될 수 있습니다.
            </li>
            <li>
              주문 / 배송 및 기타 문의가 있을 경우, 1:1 문의에 남겨주시면 신속히
              해결해드리겠습니다.
            </li>
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <Button
            variant="outline"
            className="h-[52px] w-full border-[#ddd] text-[16px] font-medium text-[#333] hover:bg-gray-50"
            onClick={() => router.push(`/mypage/orders/${orderData.orderId}`)}
          >
            주문 상세보기
          </Button>

          <Button
            className="h-[52px] w-full bg-deepBlue text-[16px] font-medium text-white hover:bg-deepBlue/80"
            onClick={() => router.push('/')}
          >
            쇼핑 계속하기
          </Button>
        </div>
      </div>
    </div>
  )
}
