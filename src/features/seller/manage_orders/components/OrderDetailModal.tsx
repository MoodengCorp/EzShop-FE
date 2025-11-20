// src/features/seller/manage_orders/components/OrderDetailModal.tsx
import { useState } from 'react'
import { OrderDetail, OrderStatus } from '@/features/orders'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Image from 'next/image'
import { ORDER_STATUS_KR } from '@/features/seller/constants/seller-constants'
import { toast } from 'sonner'
import { sellerOrdersApi } from '../api/sellerOrdersApi'

type OrderDetailModalProps = {
  order: OrderDetail | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate?: () => void
}

export function OrderDetailModal({
                                   order,
                                   isOpen,
                                   onClose,
                                   onStatusUpdate,
                                 }: OrderDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  if (!order) return null

  const handleStatusChange = (newStatus: OrderStatus) => {
    setSelectedStatus(newStatus)
    setShowConfirmDialog(true)
  }

  const handleConfirmStatusChange = async () => {
    if (!selectedStatus) return

    setIsUpdating(true)
    try {
      // 주문 상태 업데이트 API 호출
      await sellerOrdersApi.updateOrderStatus(order.orderId, selectedStatus)

      toast.success('주문 상태가 변경되었습니다.', {
        position: 'top-center'
      })
      setShowConfirmDialog(false)
      onStatusUpdate?.()
      onClose()
    } catch (error) {
      toast.error('상태 변경에 실패했습니다.', {
        position: 'top-center'
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>주문 상세 정보</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* 주문 기본 정보 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    {order.orderDate}
                  </p>
                  <p className="font-bold">주문번호 {order.orderNumber}</p>
                </div>
                {/* 상태 변경 드롭다운 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">주문 상태:</span>
                  <Select
                    value={order.orderStatus}
                    onValueChange={(value) =>
                      handleStatusChange(value as OrderStatus)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">
                        {ORDER_STATUS_KR.PENDING}
                      </SelectItem>
                      <SelectItem value="DELIVERING">
                        {ORDER_STATUS_KR.DELIVERING}
                      </SelectItem>
                      <SelectItem value="DELIVERED">
                        {ORDER_STATUS_KR.DELIVERED}
                      </SelectItem>
                      <SelectItem value="CANCEL">{ORDER_STATUS_KR.CANCEL}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator className="border-black" />
            </div>

            {/* 주문 상품 목록 */}
            <div>
              <p className="mb-3 text-lg font-bold">주문 상품</p>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex gap-3">
                      <Image
                        className="rounded-md"
                        width={56}
                        height={72}
                        src={item.thumbnailUrl}
                        alt={item.name}
                      />
                      <div className="flex flex-col justify-between text-sm">
                        <p className="font-semibold text-gray-400">샛별배송</p>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">
                          {item.purchasePrice.toLocaleString()}원 × {item.quantity}개
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {(item.purchasePrice * item.quantity).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 주문 정보 요약 */}
            <div>
              <p className="mb-3 text-lg font-bold">주문 정보</p>
              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                <OrderInfoRow
                  label="주문번호"
                  value={order.orderNumber}
                  primary
                />
                <OrderInfoRow label="주문일시" value={order.orderDate} />
                <OrderInfoRow
                  label="총 수량"
                  value={`${order.items.reduce((sum, item) => sum + item.quantity, 0)}개`}
                />
                <OrderInfoRow
                  label="총 금액"
                  value={`${order.totalPrice.toLocaleString()}원`}
                  primary
                />
                <OrderInfoRow label="주문자" value={order.deliveryInfo.recipientName}/>
                <OrderInfoRow label="연락처" value={order.deliveryInfo.recipientPhone}/>
                <OrderInfoRow label="배송지" value={`${order.deliveryInfo.address} ${order.deliveryInfo.addressDetail}`}/>
                <OrderInfoRow label="배송 요청 사항" value={order.deliveryRequest ? order.deliveryRequest : ""}/>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 상태 변경 확인 다이얼로그 */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>주문 상태 변경 확인</AlertDialogTitle>
            <AlertDialogDescription>
              주문 상태를{' '}
              <span className="font-bold text-black">
                {ORDER_STATUS_KR[order.orderStatus]}
              </span>
              에서{' '}
              <span className="font-bold text-black">
                {selectedStatus && ORDER_STATUS_KR[selectedStatus]}
              </span>
              (으)로 변경하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmStatusChange}
              disabled={isUpdating}
              className="bg-deepBlue hover:bg-deepBlue/90"
            >
              {isUpdating ? '변경 중...' : '변경'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// 주문 정보 행 컴포넌트
type OrderInfoRowProps = {
  label: string
  value: string
  primary?: boolean
}

function OrderInfoRow({ label, value, primary }: OrderInfoRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm ${primary ? 'font-bold' : ''}`}>{value}</span>
    </div>
  )
}