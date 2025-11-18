// ✅ 반복되는 UI를 컴포넌트로 분리
interface OrderInfoRowProps {
  label: string
  value: string
  primary?: boolean
}

export function OrderInfoRow({ label, value, primary }: OrderInfoRowProps) {
  return (
    <div className={`flex justify-between ${primary ? 'text-lg font-semibold' : 'text-sm font-semibold text-gray-400'}`}>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  )
}

interface OrderInfoColumnProps {
  label: string
  value: string
}

export function OrderInfoColumn({ label, value }: OrderInfoColumnProps) {
  return (
    <div className="flex flex-col gap-1 text-sm font-semibold text-gray-400">
      <p>{label}</p>
      <p className="font-extrabold">{value}</p>
    </div>
  )
}