import { Button } from '@/components/ui/button'

export default function OrderCTA({
    amount,
    disabled,
    onClick,
}: {
    amount: number
    disabled?: boolean
    onClick?: () => void
}) {
    const label = disabled
        ? '상품을 선택해주세요'
        : `${amount.toLocaleString()}원 주문하기`

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            aria-label={label}
            className={`w-[375px] h-[58px] rounded-xl font-bold transition text-lg
        ${disabled
                    ? 'bg-softBlue text-mainBlue/70 hover:bg-softBlue disabled:opacity-100 cursor-not-allowed'
                    : 'bg-deepBlue text-white hover:bg-[#006CB4] '
                }`}
        >
            {label}
        </Button>
    )
}
