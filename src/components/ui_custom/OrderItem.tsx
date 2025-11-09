import { Order } from '@/types/api'
import { ChevronRight, ShoppingCart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

export default function OrderItem({item} : {item: Order}){
  return (
    <>
      <div className="flex flex-col gap-3 mb-4 rounded-2xl bg-white px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{item.orderDate}</p>
            <p className="text-xs text-muted-foreground">주문번호 {item.orderNumber}</p>
          </div>
          <ChevronRight className="text-muted-foreground"/>
        </div>
        <Separator className="border-black"/>
        <p className="font-bold">{item.status}</p>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Image className="rounded-md" width={56} height={72} src={item.thumbnailUrl} alt="Thumbnail"/>
            <div className="flex flex-col justify-between pb-2 text-sm">
              <p className="text-gray-400 font-semibold">샛별배송</p>
              <p>{item.productName}</p>
              <p>{item.price}원</p>
            </div>
          </div>
          <Link href="/">
            <ShoppingCart className="size-9 border-gray-200 border-[1px] p-2 rounded-lg" strokeOpacity={0.7}/>
          </Link>
        </div>
      </div>
    </>
  )
}