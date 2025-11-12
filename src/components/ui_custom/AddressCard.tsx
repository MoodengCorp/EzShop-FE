import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

// TODO : 추후 변경 버튼 추가하여 모달 창 추가
type Address = {
    name: string
    phone: string
    postcode?: string
    line1: string
    line2?: string
    memo?: string
}

const MOCK: Address = {
    name: '유다현',
    phone: '010-1234-5678',
    postcode: '06000',
    line1: '경기도 광명시 디지털로 24 107동 2202호',
    line2: '',
    memo: '',
}

export default function AddressCard() {
    const [addr] = useState<Address>(MOCK)

    return (
        <div className="container w-[375px] h-[155px] space-y-6 py-8 bg-white">
            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-black" />
                        <span className="text-lg font-bold text-gray-700">배송지</span>
                    </div>

                    <div className="rounded-xl py-3">
                        <span className="inline-block rounded-full bg-[#eceff3] px-2.5 py-1 text-xs font-bold text-violet-700">
                            샛별배송
                        </span>

                        <div className="mt-2 text-base leading-6 text-black">
                            {addr.line1}
                            {addr.line2 ? <>, {addr.line2}</> : null}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
