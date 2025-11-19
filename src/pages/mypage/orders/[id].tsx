// src/pages/mypage/orders/[id].tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import MyPageLayout from '@/components/layout/MyPageLayout'
import { Separator } from '@/components/ui/separator'
import { OrderItem } from '@/features/orders/components/OrderItem'
import { ProtectedRoute } from '@/guards/ProtectedRoute'
import { ApiError } from '@/types'
import {
  OrderInfoColumn,
  OrderInfoRow,
} from '@/features/orders/components/OrderInfo'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { useOrderDetail } from '@/features/orders'

export default function OrderDetailPage() {
  const router = useRouter()
  const { id } = router.query

  // ✅ useOrderDetail 훅으로 데이터 조회
  const { data: orderDetail, isLoading, error } = useOrderDetail(id as string)
  useErrorHandler(error);

  return (
    <ProtectedRoute>
      <MyPageLayout>
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="rounded-2xl bg-white p-8 text-center">
            <p className="text-gray-600">주문 상세 정보를 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !isLoading && (
          <div className="rounded-2xl bg-white p-8 text-center">
            <p className="mb-2 text-red-600">
              {error instanceof ApiError
                ? error.message
                : '주문 상세 정보를 불러오는데 실패했습니다.'}
            </p>
            {error instanceof ApiError && !error.isAuthError() && (
              <button
                onClick={() => router.push('/mypage/orders')}
                className="text-primary underline"
              >
                주문 목록으로 돌아가기
              </button>
            )}
          </div>
        )}

        {/* 정상 상태 */}
        {!isLoading && !error && orderDetail && (
          <div>
            {/* 배송지 정보 */}
            <div className="mb-4 rounded-2xl bg-white px-4 pt-6">
              <p className="mb-4 text-lg font-semibold">주문 내역 상세</p>
              <Separator
                orientation="horizontal"
                className="border-[1px] border-black"
              />
              <div className="flex flex-col gap-3 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    {orderDetail.orderDate}
                  </p>
                  <p className="font-bold">
                    주문번호 {orderDetail.orderNumber}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="font-sans font-medium">
                    {orderDetail.deliveryInfo.address}
                  </p>
                  {
                    <p className="font-sans font-medium">
                      {orderDetail.deliveryInfo.addressDetail}
                    </p>
                  }
                </div>
              </div>
            </div>

            {/* 주문 상품 */}
            <div>
              <p className="mb-2 text-lg font-bold">주문 상품</p>
              <OrderItem order={orderDetail} viewDateAndOrderNum={false} />
            </div>

            {/* 주문 정보 */}
            <div>
              <p className="mb-2 text-lg font-bold">주문 정보</p>
              <div className="mb-4 flex flex-col gap-2 rounded-2xl bg-white px-4 py-4">
                <OrderInfoRow
                  label="주문번호"
                  value={orderDetail.orderNumber.toString()}
                  primary
                />
                <OrderInfoRow label="결제일시" value={orderDetail.orderDate} />
                <OrderInfoRow
                  label="상품 금액"
                  value={`${orderDetail.totalPrice.toLocaleString()}원`}
                />
                <OrderInfoRow label="수령인 연락처" value={orderDetail.deliveryInfo.recipientPhone} />
                <OrderInfoRow
                  label="배송지"
                  value={`${orderDetail.deliveryInfo.address} ${orderDetail.deliveryInfo.addressDetail}`}
                />
                {orderDetail.deliveryRequest && (
                  <OrderInfoColumn
                    label="배송요청사항"
                    value={orderDetail.deliveryRequest}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </MyPageLayout>
    </ProtectedRoute>
  )
}
