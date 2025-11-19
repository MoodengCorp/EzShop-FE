import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import QuantityStepper from '@/components/common/QuantityStepper' // 경로 확인
import type { CartItem as CartItemType } from '@/features/cart/types/cart'

type Props = {
  item: CartItemType & { checked: boolean } // checked 상태 추가
  onToggle: (id: number, checked: boolean) => void
  onChangeQty: (id: number, next: number) => void
  onRemove: (id: number) => void
  className?: string
}

export default function CartItem({
  item,
  onToggle,
  onChangeQty,
  onRemove,
  className,
}: Props) {
  const { cartItemId, name, thumbnailUrl, price, quantity, checked } = item

  return (
    <div className={`flex items-start gap-4 bg-white p-5 ${className ?? ''}`}>
      {/* 체크박스 */}
      <div className="shrink-0 pt-1">
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => onToggle(cartItemId, Boolean(v))}
          className="h-6 w-6 rounded-full border-gray-300 data-[state=checked]:border-deepBlue data-[state=checked]:bg-deepBlue"
          aria-label={`${name} 선택`}
        />
      </div>

      {/* 이미지 */}
      <div className="shrink-0">
        <Image
          src={thumbnailUrl}
          alt={name}
          width={80}
          height={100}
          className="rounded-md bg-gray-50 object-cover"
        />
      </div>

      {/* 정보 및 컨트롤 */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between">
          <Link
            href={`/items/${item.itemId}`}
            className="line-clamp-2 text-[16px] font-medium text-[#333] hover:underline"
          >
            {name}
          </Link>
          <button
            onClick={() => onRemove(cartItemId)}
            className="ml-2 text-gray-400 hover:text-black"
            aria-label="삭제"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 flex items-end justify-between">
          {/* 수량 조절 */}
          <div className="w-[110px]">
            <QuantityStepper
              value={quantity}
              onChange={(q) => onChangeQty(cartItemId, q)}
              min={1}
            />
          </div>
          {/* 가격 */}
          <div className="text-[18px] font-bold">
            {(price * quantity).toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  )
}
