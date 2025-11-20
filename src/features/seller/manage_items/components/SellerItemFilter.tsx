import {
  SellerItemSearchParams,
} from '@/features/seller/manage_items/types/seller-Item.types'
import { useState } from 'react'
import { ItemStatus } from '@/features/item/types/item'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ITEM_STATUS_KR } from '@/features/seller/constants/seller-constants'
import { useCategories } from '@/features/category/hooks/useCategories'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

type SellerItemFilterProps = {
  onSearch: (filters: Omit<SellerItemSearchParams, 'page' | 'perPage'>) => void
}

export function SellerItemFilter({ onSearch }: SellerItemFilterProps) {
  const [status, setStatus] = useState<ItemStatus | undefined>()
  const [itemName, setItemName] = useState('')
  const [categoryName, setCategoryName] = useState('')

  // React Query로 카테고리 목록 조회
  const { data: categories, isLoading: isCategoriesLoading } = useCategories()

  const handleSearch = () => {
    onSearch({
      itemStatus: status,
      keyword: itemName || undefined,
      categoryName: categoryName || undefined,
    })
  }

  const handleReset = () => {
    setStatus(undefined)
    setItemName('')
    setCategoryName('')
    onSearch({})
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-6 gap-4">
        {/* 상품 상태 */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="status">상품 상태</Label>
          <Select
            value={status || 'All'}
            onValueChange={(value) =>
              setStatus(value === 'All' ? undefined : (value as ItemStatus))
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">{ITEM_STATUS_KR['ALL']}</SelectItem>
              <SelectItem value="ACTIVE">{ITEM_STATUS_KR['ACTIVE']}</SelectItem>
              <SelectItem value="SOLDOUT">{ITEM_STATUS_KR['SOLDOUT']}</SelectItem>
              <SelectItem value="HIDDEN">{ITEM_STATUS_KR['HIDDEN']}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 카테고리 */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="categoryName">카테고리</Label>
          <Select
            value={categoryName || 'All'}
            onValueChange={(value) => setCategoryName(value === 'All' ? '' : value)}
            disabled={isCategoriesLoading}
          >
            <SelectTrigger id="categoryName">
              <SelectValue placeholder={isCategoriesLoading ? '로딩 중...' : '전체'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">전체</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 상품 이름 */}
        <div className="space-y-2 col-span-2">
          <Label htmlFor="itemName">상품명</Label>
          <Input
            id="itemName"
            placeholder="상품명 입력"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
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