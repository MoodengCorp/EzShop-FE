import { STATUS_COLORS, STATUS_KR } from '@/features/seller/constants/seller-constants'

type OrderStatusColorBoxProps = {
  orderStatus: string,
  orderStatusCount: number,
  icon: React.ReactNode
}

export function OrderStatusColorBox({ orderStatus, orderStatusCount, icon }: OrderStatusColorBoxProps) {
  const colors = STATUS_COLORS[orderStatus]
  const status = STATUS_KR[orderStatus]
  return (
    <div className={`flex justify-between items-center gap-14 rounded-lg p-3 mx-4 w-52 ${colors}`}>
      <div>
        <p>{status}</p>
        <p>{orderStatusCount}</p>
      </div>
      <div>{icon}</div>
    </div>
  )
}