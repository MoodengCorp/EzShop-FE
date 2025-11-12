import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Order } from '@/types/order'
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
import { mockOrders } from '@/mocks/OrderData'
import { ProtectedRoute } from '@/components/ui_custom/ProtectedRoute'

export default function OrderDetailPage() {
  const mockOrder = mockOrders[0]
  return (
    <>
      <ProtectedRoute>
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
            <OrderItem order={mockOrder} viewDateAndOrderNum={false} />
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
                <p>{mockOrder.totalPrice}원</p>
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
                <p className="font-extrabold">조심히 다뤄주세요</p>
              </div>
            </div>
          </div>
        </MyPageLayout>
      </ProtectedRoute>
    </>
  )
}
