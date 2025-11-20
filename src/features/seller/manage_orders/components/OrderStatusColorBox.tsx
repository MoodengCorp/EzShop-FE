import { ORDER_STATUS_COLORS, ORDER_STATUS_KR } from '@/features/seller/constants/seller-constants'

type OrderStatusColorBoxProps = {
  orderStatus: string,
  orderStatusCount: number,
  icon: React.ReactNode
}

export function OrderStatusColorBox({ orderStatus, orderStatusCount, icon }: OrderStatusColorBoxProps) {
  const colors = ORDER_STATUS_COLORS[orderStatus]
  const status = ORDER_STATUS_KR[orderStatus]
  return (
    <div className={`flex justify-between items-center rounded-lg p-3 mx-2 w-40 ${colors}`}>
      <div>
        <p>{status}</p>
        <p>{orderStatusCount}</p>
      </div>
      <div>{icon}</div>
    </div>
  )
}