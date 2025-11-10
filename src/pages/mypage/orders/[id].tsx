import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Order } from '@/types/api'
import MyPageLayout from '@/components/layout/MyPageLayout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, Search, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SelectDateFilter } from '@/pages/mypage/orders'
import { fetchOrderDetail, fetchOrders } from '@/lib/api/orders'
import Image from 'next/image'
import OrderItem from '@/components/ui_custom/OrderItem'

const mockOrder = {
  id: 22,
  orderNumber: 2394812560132,
  productName: '[김구원선생] 국산 두부로 만든 우동 (2인분)',
  amount: 1,
  orderDate: '2025.11.11',
  status: '주문 완료',
  thumbnailUrl:
    'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
  price: 9810,
}

export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      // loadOrderDetail(id as string)
    }
  }, [id])

  // const loadOrderDetail = async (orderId: string)=> {
  //   setIsLoading(true)
  //   setError(null)
  //   const response = await fetchOrderDetail(orderId)
  //   if(response.success){
  //     setOrder(response.data)
  //   } else {
  //     setError(response.error.message)
  //   }
  //   setIsLoading(false)
  // }
  // 로딩 중
  // if (isLoading) {
  //   return (
  //     <MyPageLayout>
  //       <div className="flex justify-center items-center h-64">
  //         <p className="text-gray-600">주문 상세 정보를 불러오는 중...</p>
  //       </div>
  //     </MyPageLayout>
  //   )
  // }

  // 에러 발생
  // if (error || !order) {
  //   return (
  //     <MyPageLayout>
  //       <div className="flex flex-col items-center justify-center h-64 gap-4">
  //         <p className="text-red-600">{error || '주문 정보를 찾을 수 없습니다.'}</p>
  //         <Link href="/mypage/orders">
  //           <Button variant="outline">주문 목록으로 돌아가기</Button>
  //         </Link>
  //       </div>
  //     </MyPageLayout>
  //   )
  // }

  return (
    <>
      <MyPageLayout>
        <div className="mb-4 rounded-2xl bg-white px-4 pt-6">
          <p className="mb-4 text-lg font-semibold">주문 내역 상세</p>
          <Separator
            orientation="horizontal"
            className="border-[1px] border-black"
          />
          <div className="flex flex-col gap-3 px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-400">
                {mockOrder.orderDate}
              </p>
              <p className="font-bold">주문번호 {mockOrder.orderNumber}</p>
            </div>
            <Separator />
            <div>
              <p className="font-sans font-medium">
                서울 영등포구 당산로 42길 16 (당산현대5차아파트)
              </p>
              <p className="font-sans font-medium">505동 403호</p>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 text-lg font-bold">주문 상품</p>
          <OrderItem item={mockOrder} viewDateAndOrderNum={false} />
        </div>
        <div>
          <p className="mb-2 text-lg font-bold">주문 정보</p>
          <div className="mb-4 flex flex-col gap-2 rounded-2xl bg-white px-4 py-4">
            <div className="flex justify-between text-lg font-semibold">
              <p>주문번호</p>
              <p>{mockOrder.orderNumber}</p>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <p>보내는분</p>
              <p>홍예석</p>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <p>결제일시</p>
              <p>{mockOrder.orderDate}</p>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <p>상품 금액</p>
              <p>{mockOrder.price}원</p>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <p>연락처</p>
              <p>010-1234-1234</p>
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-400">
              <p>배송지</p>
              <p>서울시 영등포구 당산로 42길 16 505동 403호</p>
            </div>
            <div className="flex flex-col gap-1 text-sm font-semibold text-gray-400">
              <p>배송요청사항</p>
              <p className="font-extrabold">
                조심히 다뤄주세요
              </p>
            </div>
          </div>
        </div>
      </MyPageLayout>
    </>
  )
}
