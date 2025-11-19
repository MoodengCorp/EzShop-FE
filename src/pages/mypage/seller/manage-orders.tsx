import { ProtectedRoute } from '@/guards/ProtectedRoute'
import MyPageLayout from '@/components/layout/MyPageLayout'
import { Separator } from '@/components/ui/separator'
import { OrderStatusColorBox } from '@/features/seller/manage_orders/components/OrderStatusColorBox'
import { PackageCheck, ShoppingBasket, Truck } from 'lucide-react'
import { useState } from 'react'
import { SellerOrderSearchParams } from '@/features/seller/manage_orders/types/seller-order.types'
import { useOrderStatusCounts, useSellerOrders } from '@/features/seller/manage_orders/hooks/useSellerOrders'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { SellerOrderFilter } from '@/features/seller/manage_orders/components/SellerOrderFilter'
import { SellerOrderTable } from '@/features/seller/manage_orders/components/SellerOrderTable'
import { SellerOrderPagination } from '@/features/seller/manage_orders/components/SellerOrderPagination'

export default function ManageOrders() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Omit<SellerOrderSearchParams, 'page' | 'perPage'>>({})

  const {
    data: orderData,
    isLoading: isLoadingOrders,
    error: ordersError
  } = useSellerOrders({
    ...filters,
    page: currentPage,
    perPage: 10,
  })
  const {data: statusCounts} = useOrderStatusCounts()
  useErrorHandler(ordersError)

  const handleSearch = (newFilters: Omit<SellerOrderSearchParams, 'page'| 'perPage'>)=> {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number)=> {
    setCurrentPage(page)
  }

  return (
    <ProtectedRoute>
      <MyPageLayout>
        <div className="flex flex-col gap-4 py-4 px-4 rounded-2xl bg-white">
          {/* 헤더 */}
          <div>
            <p className="text-2xl font-semibold">주문 관리</p>
            <p className="text-xs text-muted-foreground">고객들의 주문을 확인하고 관리하세요</p>
          </div>

          <Separator />

          {/* 상태 요약 */}
          <div className="flex justify-between">
            <OrderStatusColorBox
              orderStatus="PENDING"
              orderStatusCount={statusCounts?.PENDING ?? 0}
              icon={<ShoppingBasket />}
            />
            <OrderStatusColorBox
              orderStatus="DELIVERING"
              orderStatusCount={statusCounts?.DELIVERING ?? 0}
              icon={<Truck />}
            />
            <OrderStatusColorBox
              orderStatus="DELIVERED"
              orderStatusCount={statusCounts?.DELIVERED ?? 0}
              icon={<PackageCheck />}
            />
          </div>

          <Separator />

          {/* 필터 */}
          <SellerOrderFilter onSearch={handleSearch} />

          {/* 테이블 */}
          <SellerOrderTable orders={orderData?.orders ?? []} isLoading={isLoadingOrders} />

          {/* 페이지네이션 */}
          {orderData?.pagination && (
            <SellerOrderPagination
              pagination={orderData.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </MyPageLayout>
    </ProtectedRoute>
  )
}
