import { Card, CardContent } from '@/components/ui/card'

export default function PaymentSummary({
  itemsSubtotal = 0,
}: {
  itemsSubtotal?: number
}) {
  const fmt = (n: number) => `${n.toLocaleString()}원`
  // 우선 0원으로 설정
  const discountTotal = 0
  const shippingFee = 0
  const total = itemsSubtotal - discountTotal + shippingFee

  return (
    <div className="w-[375px]">
      <Card className="rounded-2xl bg-white">
        <CardContent className="p-5">
          <h3 className="mb-3 text-lg font-bold text-gray-700">결제금액</h3>

          <div className="space-y-3 text-base font-semibold">
            <Row label="상품금액" value={fmt(itemsSubtotal)} />
            <Row label="상품할인금액" value={fmt(discountTotal)} />
            <Row label="배송비" value={fmt(shippingFee)} />
          </div>

          <div className="my-3 border-t border-borderGray" />

          <div className="flex items-center justify-between">
            <span className="font-semibold">결제예정금액</span>
            <span className="text-xl font-extrabold">{fmt(total)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span>{value}</span>
    </div>
  )
}
