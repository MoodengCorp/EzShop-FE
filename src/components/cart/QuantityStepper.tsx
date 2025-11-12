import { Minus, Plus } from 'lucide-react'


export default function QuantityStepper({
    value,
    min = 1,
    max = 10000,
    step = 1,
    onChange,
    disabled = false,
}: {
    value: number
    min?: number
    max?: number
    step?: number
    onChange: (n: number) => void
    disabled?: boolean
}) {
    const clamp = (n: number) => Math.min(max, Math.max(min, isNaN(n) ? min : n))
    const dec = () => onChange(clamp(value - step))
    const inc = () => onChange(clamp(value + step))

    return (
        <div
            className={[
                'inline-flex items-center',
                'rounded-full bg-[#eceff3] px-1.5 py-1',
                disabled ? 'opacity-50 pointer-events-none' : '',
            ].join(' ')}
            role="group"
            aria-label="수량 조절"
        >
            <button
                type="button"
                onClick={dec}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                aria-label="수량 감소"
            >
                <Minus className="h-4 w-4" strokeWidth={2} />
            </button>

            <span className=" w-6 text-center font-bold tabular-nums select-none">
                {value}
            </span>

            <button
                type="button"
                onClick={inc}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                aria-label="수량 증가"
            >
                <Plus className="h-4 w-4" strokeWidth={2} />
            </button>
        </div>
    )
}
