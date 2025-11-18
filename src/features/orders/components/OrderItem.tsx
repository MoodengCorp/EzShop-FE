import { Order } from '@/features/orders/types/order'
import { ChevronRight, ShoppingCart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

interface OrderItemProps {
  order: Order
  viewDateAndOrderNum: boolean
}

export function OrderItem({
  order,
  viewDateAndOrderNum,
}: OrderItemProps) {
  return (
    <>
      <div className="mb-4 flex flex-col gap-3 rounded-2xl bg-white px-4 py-4">
        {viewDateAndOrderNum && <DateAndOrderNum order={order} />}
        <p className="font-bold">{order.orderStatus}</p>
        {order.items.map((item) => (
          <div className="flex justify-between px-2 py-2" key={item.itemId}>
            <div className="flex gap-3" >
              <Image
                className="rounded-md"
                width={56}
                height={72}
                src={item.thumbnailUrl}
                alt={item.name}
              />
              <div className="flex flex-col justify-between pb-2 text-sm">
                <p className="font-semibold text-gray-400">샛별배송</p>
                <p>{item.name}</p>
                <p>{item.purchasePrice}원</p>
              </div>
            </div>
            <Link href="/public">
              <ShoppingCart
                className="size-9 rounded-lg border-[1px] border-gray-200 p-2"
                strokeOpacity={0.7}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

function DateAndOrderNum({ order }: { order: Order }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{order.orderDate}</p>
          <p className="text-xs text-muted-foreground">
            주문번호 {order.orderNumber}
          </p>
        </div>
        <Link href={`/mypage/orders/${order.orderId}`}>
          <ChevronRight className="text-muted-foreground" />
        </Link>
      </div>
      <Separator className="border-black" />
    </>
  )
}
