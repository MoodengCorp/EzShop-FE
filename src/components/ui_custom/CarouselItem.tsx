import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

type CarouselItemProps = {
  item: {
    id: number
    name: string
    price: number
    thumbnailFile: string
  }
}

export default function CarouselItem({ item }: CarouselItemProps) {
  return (
    <Card className="w-[240px] overflow-hidden rounded-none border-0 shadow-none">
      <CardContent className="p-0">
        <div className="w-full">
          <div className="relative aspect-[10/13] w-full overflow-hidden">
            {/* 다음에 이미지 받아올 시, border 4px 된 것으로 받아오기 때문에 rounded-4px 삭제할 예정 */}
            <Image
              src={item.thumbnailFile}
              alt={item.name}
              fill
              className="absolute inset-0 m-auto block max-h-full min-h-full min-w-full max-w-full rounded-[4px] object-cover duration-200 ease-out hover:scale-[1.03]"
              sizes="(max-width: 768px) 240px, 360px"
              priority={false}
            />
          </div>

          <Button
            variant="outline"
            className="borderGray mt-[6px] flex h-[36px] w-full items-center justify-center gap-[4px] rounded-[4px] border text-base text-main leading-[36px] text-black"
          >
            <ShoppingCart />
            <span>담기</span>
          </Button>
        </div>

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
