import { Order } from '@/types/api'
import { ChevronRight, ShoppingCart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderItem({
  item,
  viewDateAndOrderNum,
}: {
  item: Order
  viewDateAndOrderNum: boolean
}) {
  return (
    <>
      <div className="mb-4 flex flex-col gap-3 rounded-2xl bg-white px-4 py-4">
        {viewDateAndOrderNum && <DateAndOrderNum item={item} />}
        <p className="font-bold">{item.status}</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Image
              className="rounded-md"
              width={56}
              height={72}
              src={item.thumbnailUrl}
              alt="Thumbnail"
            />
            <div className="flex flex-col justify-between pb-2 text-sm">
              <p className="font-semibold text-gray-400">샛별배송</p>
              <p>{item.productName}</p>
              <p>{item.price}원</p>
            </div>
          </div>
          <Link href="/">
            <ShoppingCart
              className="size-9 rounded-lg border-[1px] border-gray-200 p-2"
              strokeOpacity={0.7}
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export function DateAndOrderNum({ item }: { item: Order }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{item.orderDate}</p>
          <p className="text-xs text-muted-foreground">
            주문번호 {item.orderNumber}
          </p>
        </div>
        <Link href={`/mypage/orders/${item.id}`}>
          <ChevronRight className="text-muted-foreground" />
        </Link>
      </div>
      <Separator className="border-black" />
    </>
  )
}
