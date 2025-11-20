import { ProtectedRoute } from '@/guards/ProtectedRoute'
import MyPageLayout from '@/components/layout/MyPageLayout'
import { Separator } from '@/components/ui/separator'
import { ShoppingBasket } from 'lucide-react'
import { CustomPagination } from '@/components/common/CustomPagination'
import { ItemStatusColorBox } from '@/features/seller/manage_items/components/ItemStatusColorBox'
import { useState } from 'react'
import { SellerItemSearchParams } from '@/features/seller/manage_items/types/seller-Item.types'
import {
  useItemStatusCounts,
  useSellerItems,
} from '@/features/seller/manage_items/hooks/useSellerItems'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { SellerItemFilter } from '@/features/seller/manage_items/components/SellerItemFilter'
import { SellerItemTable } from '@/features/seller/manage_items/components/SellerItemTable'

export default function ManageItems() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<
    Omit<SellerItemSearchParams, 'page' | 'perPage'>
  >({})

  const {
    data: itemData,
    isLoading: isLoadingItems,
    error: itemsError,
    refetch: refetchItems,
  } = useSellerItems({
    ...filters,
    page: currentPage,
    perPage: 10,
  })
  const { data: statusCounts, refetch: refetchCounts } = useItemStatusCounts()
  useErrorHandler(itemsError)

  const handleSearch = (
    newFilters: Omit<SellerItemSearchParams, 'page' | 'perPage'>,
  ) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRefresh = () => {
    refetchItems()
    refetchCounts()
  }

  return (
    <ProtectedRoute>
      <MyPageLayout>
        <div className="flex flex-col gap-4 rounded-2xl bg-white px-4 py-4">
          {/* 헤더 */}
          <div>
            <p className="text-2xl font-semibold">상품 관리</p>
            <p className="text-xs text-muted-foreground">
              상품 정보를 확인하고 관리하세요
            </p>
          </div>

          <Separator />

          {/* 상태 요약 */}
          <div className="flex justify-between">
            <ItemStatusColorBox
              itemStatus="ALL"
              itemStatusCount={statusCounts?.ALL ?? 0}
              icon={<ShoppingBasket />}
            />
            <ItemStatusColorBox
              itemStatus="ACTIVE"
              itemStatusCount={statusCounts?.ACTIVE ?? 0}
              icon={<ShoppingBasket />}
            />
            <ItemStatusColorBox
              itemStatus="SOLDOUT"
              itemStatusCount={statusCounts?.SOLDOUT ?? 0}
              icon={<ShoppingBasket />}
            />
            <ItemStatusColorBox
              itemStatus="HIDDEN"
              itemStatusCount={statusCounts?.HIDDEN ?? 0}
              icon={<ShoppingBasket />}
            />
          </div>

          <Separator />

          {/* 필터 */}
          <SellerItemFilter onSearch={handleSearch} />

          {/* 테이블 */}
          <SellerItemTable
            items={itemData?.items ?? []}
            isLoading={isLoadingItems}
            onRefresh={handleRefresh}
          />

          {/* 페이지네이션 */}
          {itemData?.pagination && (
            <CustomPagination
              pagination={itemData.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </MyPageLayout>
    </ProtectedRoute>
  )
}
