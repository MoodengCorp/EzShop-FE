// src/features/orders/components/seller/SellerOrderFilter.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Search } from 'lucide-react'
import { SellerOrderSearchParams } from '@/features/seller/manage_orders/types/seller-order.types'
import { OrderStatus } from '@/features/orders'

type SellerOrderFilterProps = {
  onSearch: (filters: Omit<SellerOrderSearchParams, 'page' | 'perPage'>) => void
}

export function SellerOrderFilter({ onSearch }: SellerOrderFilterProps) {
  const [status, setStatus] = useState<OrderStatus | undefined>()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [itemName, setItemName] = useState('')
  const [buyerName, setBuyerName] = useState('')

  const handleSearch = () => {
    onSearch({
      status,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      itemName: itemName || undefined,
      buyerName: buyerName || undefined,
    })
  }

  const handleReset = () => {
    setStatus(undefined)
    setStartDate('')
    setEndDate('')
    setItemName('')
    setBuyerName('')
    onSearch({})
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-6 gap-4">
        {/* 주문 상태 */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="status">주문 상태</Label>
          <Select
            value={status || 'all'}
            onValueChange={(value) => setStatus(value === 'all' ? undefined : value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="PENDING">주문 접수</SelectItem>
              <SelectItem value="DELIVERING">배송중</SelectItem>
              <SelectItem value="DELIVERED">배송 완료</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 기간 시작 */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="startDate">시작일</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* 기간 종료 */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="endDate">종료일</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* 상품명 */}
        <div className="space-y-2 col-span-3">
          <Label htmlFor="itemName">상품명</Label>
          <Input
            id="itemName"
            placeholder="상품명 입력"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        {/* 주문자명 */}
        <div className="space-y-2 col-span-3">
          <Label htmlFor="buyerName">주문자명</Label>
          <Input
            id="buyerName"
            placeholder="주문자명 입력"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={handleReset}>
          초기화
        </Button>
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          검색
        </Button>
      </div>
    </div>
  )
}