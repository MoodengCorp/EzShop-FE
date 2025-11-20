import { ITEM_STATUS_COLORS, ITEM_STATUS_KR } from '@/features/seller/constants/seller-constants'


type ItemStatusColorBoxProps = {
  itemStatus?: string,
  itemStatusCount: number,
  icon: React.ReactNode
}

export function ItemStatusColorBox({itemStatus = "ALL", itemStatusCount, icon}: ItemStatusColorBoxProps){
  const colors = ITEM_STATUS_COLORS[itemStatus]
  const status = ITEM_STATUS_KR[itemStatus]
  return (
    <div className={`flex justify-between items-center rounded-lg p-3 mx-2 w-40 ${colors}`}>
      <div>
        <p>{status}</p>
        <p>{itemStatusCount}</p>
      </div>
      <div>{icon}</div>
    </div>
  )
}