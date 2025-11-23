'use client'

// pages/mypage/orders.tsx
import MyPageLayout from '@/components/layout/MyPageLayout'
import { Separator } from '@/components/ui/separator'
import React, { useMemo, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OrderPeriod } from '@/features/orders/types/order'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { usePagination } from '@/hooks/usePagination'
import DefaultPagination from '@/components/common/DefaultPagination'
import { ProtectedRoute } from '@/guards/ProtectedRoute'
import { useRouter } from 'next/router'
import { OrderItem, useOrderFilters, useOrders } from '@/features/orders'

export default function OrdersPage() {
  const { period, setPeriod } = useOrderFilters() // URL에서 관리
  const [searchQuery, setSearchQuery] = useState('')
  const { data: orders } = useOrders(period)

  // 검색 필터링, 백엔드 완성되면 이걸로 교체
  const filteredOrders = useMemo(() => {
    if (!orders) return []
    if (!searchQuery.trim()) return orders

    return orders!.filter((order) =>
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [orders, searchQuery])

  const pagination = usePagination({
    data: filteredOrders,
    itemsPerPage: 5,
  })

  const handlePeriodChange = (newPeriod: OrderPeriod) => {
    setPeriod(newPeriod)
  }

  return (
    <ProtectedRoute>
      <MyPageLayout>
        <div>
          <div className="mb-4 rounded-2xl bg-white px-4 py-4">
            <p className="mb-4 text-lg font-semibold">주문 내역</p>
            <Separator
              orientation="horizontal"
              className="mb-4 border-[1px] border-black"
            />
            <div className="flex items-center justify-between gap-4">
              <SelectDateFilter
                value={period}
                onPeriodChange={handlePeriodChange}
              />
              <div className="flex w-full items-center rounded-lg bg-[#F2F5F8] px-2">
                <Search className="text-gray-400" />
                <Input
                  type="text"
                  className="border-0 px-4 font-extrabold focus-visible:ring-0"
                  placeholder="상품명으로 검색해보세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredOrders?.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center">
              {searchQuery ? (
                <>
                  <p className="mb-2 text-gray-600">
                    {searchQuery}에 대한 검색 결과가 없습니다.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-primary underline"
                  >
                    검색 초기화
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-4 text-gray-600">주문 내역이 없습니다.</p>
                  <button
                    onClick={() => (window.location.href = '/')}
                    className="rounded-lg bg-primary px-4 py-2 text-white"
                  >
                    쇼핑하러 가기
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {pagination.currentData.map((order) => (
                <OrderItem
                  key={order.orderId}
                  order={order}
                  viewDateAndOrderNum={true}
                />
              ))}

              <DefaultPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.goToPage}
              />
            </>
          )}
        </div>
      </MyPageLayout>
    </ProtectedRoute>
  )
}

type SelectDateFilterProps = {
  value: string // ✅ value prop 추가
  onPeriodChange?: (period: OrderPeriod) => void
}

export function SelectDateFilter({
  value,
  onPeriodChange,
}: SelectDateFilterProps) {
  return (
    <Select value={value} onValueChange={onPeriodChange}>
      {/* ✅ defaultValue 제거, value 사용 */}
      <SelectTrigger className="w-[80px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="3개월">3개월</SelectItem>
          <SelectItem value="6개월">6개월</SelectItem>
          <SelectItem value="1년">1년</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
