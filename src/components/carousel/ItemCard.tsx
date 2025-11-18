import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import type { Item } from '@/types'

type Props = {
  item: Item
}

export default function ItemCard({ item }: Props) {
  return (
    <Card className="w-full rounded-none border-0 p-0 shadow-none">
      <CardContent className="p-0">
        <div className="relative aspect-[10/13] w-full overflow-hidden rounded-[4px]">
          <Image
            src={item.thumbnailUrl}
            alt={item.name}
            fill
            className="absolute inset-0 m-auto block max-h-full min-h-full min-w-full max-w-full object-cover transition-transform duration-200 ease-out hover:scale-[1.03]"
            sizes="(max-width: 768px) 240px, 360px"
          />
        </div>

        <Button
          variant="outline"
          className="borderGray mt-[6px] flex h-[36px] w-full items-center justify-center gap-[4px] rounded-[4px] border text-base leading-[36px] text-black"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>담기</span>
        </Button>

        <div className="mt-[14px] flex flex-col gap-[8px]">
          <p className="line-clamp-2 text-main font-medium leading-tight text-black">
            {item.name}
          </p>

          <span className="text-main font-bold">
            {item.price.toLocaleString()}원
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
