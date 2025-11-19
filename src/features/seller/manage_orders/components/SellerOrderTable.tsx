import { OrderDetail } from '@/features/orders'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  STATUS_COLORS,
  STATUS_KR,
} from '@/features/seller/constants/seller-constants'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { OrderDetailModal } from '@/features/seller/manage_orders/components/OrderDetailModal'

type SellerOrderTableProps = {
  orders: OrderDetail[]
  isLoading?: boolean
  onRefresh?: () => void
}

export function SellerOrderTable({
  orders,
  isLoading,
  onRefresh,
}: SellerOrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetail = (order: OrderDetail) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  const handleStatusUpdate = () => {
    onRefresh?.()
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    )
  }

  if (orders.length == 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">주문 내역이 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">주문번호</TableHead>
              <TableHead className="text-center">상품명</TableHead>
              <TableHead>수량</TableHead>
              <TableHead className="text-center">금액</TableHead>
              <TableHead className="text-center">상태</TableHead>
              <TableHead className="text-center">주문일</TableHead>
              <TableHead>상세조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {order.items[0].name}
                    {order.items.length > 1 && (
                      <span className="ml-1 text-muted-foreground">
                        외 {order.items.length - 1}건
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}개
                </TableCell>
                <TableCell>{order.totalPrice.toLocaleString()}원</TableCell>
                <TableCell>
                  <p
                    className={`${STATUS_COLORS[order.orderStatus]} rounded-lg py-1 text-center`}
                  >
                    {STATUS_KR[order.orderStatus]}
                  </p>
                </TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString('ko-KR')}
                </TableCell>
                <TableCell>
                  <Button className="bg-deepBlue hover:bg-deepBlue/90"
                  onClick={() => handleViewDetail(order)}>
                    조회
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  )
}
