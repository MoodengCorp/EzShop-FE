import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button' // 변경 버튼용 (선택사항)

type Address = {
  address: string
  addressdetail: string
}

const MOCK: Address = {
  address: '서울 영등포구 당산로42길 16 (당산현대 5차아파트)',
  addressdetail: ' 505동 403호',
}

export default function AddressCard() {
  const [addr] = useState<Address>(MOCK)

  return (
    <Card className="rounded-xl border-none shadow-sm ring-1 ring-gray-100">
      <CardContent className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-black" />
            <span className="text-lg font-bold text-gray-700">배송지</span>
          </div>
          <Button
            variant="outline"
            className="h-8 px-3 text-xs font-medium text-gray-600"
          >
            변경
          </Button>
        </div>

        <div className="rounded-xl py-1">
          <div className="mt-3 text-[16px] leading-6 text-[#333]">
            {addr.address}
            {addr.address && <div className="mt-1">{addr.addressdetail}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
