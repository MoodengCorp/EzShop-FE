import { useState } from 'react'
import CartItem from '@/components/cart/CartItem'
import type { Item } from '@/types/cart'
import { MOCK_PRODUCTS } from '@/mocks/products'
import PaymentSummary from '@/components/ui_custom/PaymentSummary'
import AddressCard from '@/components/ui_custom/AddressCard'
import OrderCTA from '@/components/ui_custom/OrderCTA'

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

            {/* 임시 확인용 */}
            <div className='flex flex-col gap-12'>

                <AddressCard />

                <PaymentSummary itemsSubtotal={9980} />

                <OrderCTA amount={1000} disabled={false} />

            </div>
        </div>
    )
}
