import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import QuantityStepper from '../../../components/common/QuantityStepper'
import type { Item } from '@/features/cart/types/cart'

type Props = {
    item: Item
    onToggle: (id: number, checked: boolean) => void
    onChangeQty: (id: number, next: number) => void
    onRemove: (id: number) => void
    className?: string
}

export default function CartItem(props: Props) {
    const { item, onToggle, onChangeQty, onRemove, className } = props
    const { id, name, thumbnailUrl, price, quantity = 1, checked = true } = item

    return (
        <div className={`flex items-start gap-3 rounded-lg  bg-white p-4 ${className ?? ''}`}>
            <div className='pt-1'>
                <Checkbox
                    checked={checked}
                    onCheckedChange={(v) => onToggle(id, Boolean(v))}
                    className="w-5 h-5"
                    aria-label={`${name} 선택`}

                /></div>
            <div className="min-w-0 grow flex-col flex">
                <div className="flex items-start justify-between">
                    <Link
                        href="/public#"
                        className="truncate hover:underline font-semibold"
                        title={name}
                    >
                        {name}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove(id)}
                        aria-label="삭제"
                        className="h-7 w-7 [&_svg]:h-5 [&_svg]:w-5 text-gray-500"
                    >
                        <X />
                    </Button>
                </div>

                <div className="flex flex-start">
                    <div className="flex  items-start mr-4">
                        <Image src={thumbnailUrl} alt={name} width={56}
                            height={72} className="rounded-md" />
                    </div>

                    <div className="flex flex-col items-start justify-between">
                        <div className="font-bold">
                            {(price * quantity).toLocaleString()}원
                        </div>
                        <div>
                            <QuantityStepper value={quantity} onChange={(q) => onChangeQty(id, q)} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
