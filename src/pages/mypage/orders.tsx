// pages/mypage/orders.tsx
import MyPageLayout from '@/components/layout/MyPageLayout'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Order } from '@/types/api'
import { fetchOrders } from '@/lib/api/orders'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import OrderItem from '@/components/ui_custom/OrderItem'
import { mockOrders } from '@/TempMockData'
import { usePagination } from '@/hooks/usePagination'
import DefaultPagination from '@/components/ui_custom/DefaultPagination'

export default function OrdersPage() {
  const [period, setPeriod] = useState('3개월')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pagination = usePagination({
    data: mockOrders,
    itemsPerPage: 5,
  })

  const loadOrders = async (selectedPeriod: string) => {
    setIsLoading(true)
    setError(null)
    const response = await fetchOrders(selectedPeriod)
    if (response.success) {
      setOrders(response.data.orders)
    } else {
      setError(response.error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadOrders(period)
  }, [])

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod)
    loadOrders(newPeriod)
  }

  if (isLoading) {
    return <div>로딩중</div>
  }
  // if(error){
  //   return <div>에러남</div>
  // }

  return (
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
                className="border-0 px-4 font-extrabold focus-visible:ring-0"
                placeholder="상품명으로 검색해보세요"
              />
            </div>
          </div>
        </div>
        {pagination.currentData.length === 0 ? (
          // todo: 주문 내역 없는 경우의 컴포넌트 구현 필요
          <div>주문 내역이 없습니다.</div>
        ) : (
          <>
            {pagination.currentData.map((orderItem) => (
              <OrderItem key={orderItem.id} item={orderItem} viewDateAndOrderNum={true} />
            ))}
          </>
        )}
        <DefaultPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
        />
      </div>
    </MyPageLayout>
  )
}

type SelectDateFilterProps = {
  value: string // ✅ value prop 추가
  onPeriodChange?: (period: string) => void
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
