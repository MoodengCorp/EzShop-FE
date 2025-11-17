// pages/dev/cart-item-demo.tsx
import { useState } from 'react'
import CartItem from '@/features/cart/components/CartItem'
import type { Item } from '@/features/cart/types/cart'
import { MOCK_PRODUCTS } from '@/mocks/products'

const toItem = (p: (typeof MOCK_PRODUCTS)[number]): Item => ({
    id: p.id,
    name: p.name,
    price: p.price,
    thumbnailUrl: p.thumbnailUrl,
    quantity: 1,
    checked: true,
})

export default function CartItemDemoPage() {
    const [item, setItem] = useState<Item>(toItem(MOCK_PRODUCTS[0]))

    const onToggle = (id: number, checked: boolean) =>
        setItem((it) => (it.id === id ? { ...it, checked } : it))

    const onChangeQty = (id: number, next: number) =>
        setItem((it) => (it.id === id ? { ...it, quantity: Math.max(1, next) } : it))

    const onRemove = (id: number) => {
        // 프리뷰용: 삭제 시 수량 1 & 체크 해제만
        setItem((it) => (it.id === id ? { ...it, quantity: 1, checked: false } : it))
        alert('프리뷰: 삭제 클릭됨')
    }

    return (
        <div className="container max-w-xl py-8">
            <h1 className="mb-4 text-xl font-bold">CartItem Preview</h1>
            <CartItem
                item={item}
                onToggle={onToggle}
                onChangeQty={onChangeQty}
                onRemove={onRemove}
            />
        </div>
    )
}
