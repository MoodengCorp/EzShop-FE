import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Bell, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuantityStepper from '@/components/common/QuantityStepper'
import { useAddToCart } from '@/features/cart/hooks/useCart'
import { useItemDetailQuery } from '@/features/item/hooks/useItem'
import { Skeleton } from '@/components/ui/skeleton'

export default function ItemDetailPage() {
  const [liked, setLiked] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const itemId = Number(id)

  const [quantity, setQuantity] = useState(1)

  const { data: response, isLoading, isError } = useItemDetailQuery(itemId)
  const item = response?.data

  // 장바구니 담기 훅
  const { mutate: addToCart } = useAddToCart()

  const handleAddToCart = () => {
    if (!item) return

    addToCart(
      {
        itemId,
        quantity,
      },
      {
        onSuccess: () => {
          // TODO: 토스트 메시지나 알림 모달 띄울 수 있으면 하기
        },
        onError: (error) => {
          console.error('장바구니 추가 실패:', error)
        },
      },
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto w-[1050px] pb-[100px] pt-24">
        <div className="flex justify-between gap-[60px]">
          <Skeleton className="h-[550px] w-[430px] rounded-[10px]" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  // 에러 또는 데이터 없음 처리
  if (isError || !item) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-500">상품 정보를 불러올 수 없습니다.</p>
        <Button onClick={() => router.back()} variant="outline">
          뒤로 가기
        </Button>
      </div>
    )
  }

  const totalPrice = item.price * quantity

  // 이미지 URL 폴백
  const mainImage = item.thumbnailUrl || '/ezshop_logo.png'
  const detailImage = item.detailImageUrl || '/ezshop_logo.png'

  return (
    <div className="mx-auto w-[1050px] pb-[100px] pt-24 font-sans text-[#333]">
      <div className="flex justify-between gap-[60px]">
        {/* 좌측 이미지 */}
        <div className="relative h-[550px] w-[430px] shrink-0 overflow-hidden rounded-[10px] bg-gray-50">
          <Image
            src={mainImage}
            alt={item.name}
            fill
            priority
            className="object-cover"
            sizes="430px"
          />
        </div>

        {/* 우측 정보 */}
        <div className="flex-1">
          {/* 타이틀 및 공유 */}
          <div className="flex flex-col border-b border-[#f4f4f4] pb-[20px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-bold text-[#555]">
                {item.deliveryType === 'FAST' ? '샛별배송' : '일반배송'}
              </span>
              <button
                type="button"
                aria-label="공유하기"
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <Share2 className="h-6 w-6 text-[#333]" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mb-[4px] text-[24px] font-bold leading-[34px] text-[#333]">
              {item.name}
            </div>

            <div className="flex py-1 text-[20px]">
              <div className="pr-1">원산지: </div>
              <div>{item.origin}</div>
            </div>
          </div>

          {/* 가격 */}
          <div className="py-[20px]">
            <div className="flex items-end gap-[4px]">
              <span className="text-[28px] font-bold text-[#333]">
                {item.price.toLocaleString()}
              </span>
              <span className="mb-[4px] text-[18px] font-bold text-[#333]">
                원
              </span>
            </div>
          </div>

          {/* 상세 정보들 */}
          <div className="mt-[20px] border-t border-[#f4f4f4]">
            <div className="flex flex-col gap-3">
              <DetailRow
                label="배송"
                value={item.deliveryType === 'FAST' ? '샛별배송' : '일반배송'}
                subValue="23시 전 주문 시 수도권/충청 내일 아침 7시 전 도착"
              />
              <DetailRow
                label="포장타입"
                value={item.packagingType}
                subValue="택배배송은 에코 포장이 스티로폼으로 대체됩니다."
              />
              <DetailRow label="판매단위" value={item.salesUnit} />
              <DetailRow label="중량/용량" value={`${item.weight}g`} />
            </div>
          </div>

          {/* 상품 선택 박스 */}
          <div className="border-b border-[#f4f4f4] py-[16px]">
            <div className="flex text-[14px]">
              <div className="w-[128px] shrink-0 pt-[12px] font-medium text-[#666]">
                상품선택
              </div>

              <div className="flex-1">
                <div className="flex min-h-[90px] flex-col gap-3 border border-[#f4f4f4] bg-white p-[12px_16px]">
                  <span className="text-[12px] text-[#333]">{item.name}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <QuantityStepper
                      value={quantity}
                      onChange={setQuantity}
                      min={1}
                      // 재고 수량만큼만 선택 가능하게 제한 (stockQuantity가 없으면 기본 99)
                      max={item.stockQuantity || 99}
                    />
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#333]">
                        {totalPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 총 상품금액 */}
          <div className="flex items-end justify-end gap-[8px] border-t border-[#f4f4f4] py-[20px]">
            <span className="mb-[4px] text-[13px] font-semibold text-[#333]">
              총 상품금액:
            </span>
            <span className="text-[32px] font-bold leading-[36px] text-[#333]">
              {totalPrice.toLocaleString()}
            </span>
            <span className="mb-[4px] text-[20px] font-bold text-[#333]">
              원
            </span>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-[12px]">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setLiked(!liked)}
              className="h-[56px] w-[56px] rounded-[3px] border-[#ddd]"
            >
              <Heart
                className="!h-6 !w-6"
                strokeWidth={1.5}
                color={liked ? 'red' : '#333'}
                fill={liked ? 'red' : 'none'}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-[56px] w-[56px] rounded-[3px] border-[#ddd]"
            >
              <Bell className="!h-6 !w-6 text-[#333]" strokeWidth={1.5} />
            </Button>
            <Button
              className="h-[56px] flex-1 rounded-[3px] bg-mainBlue text-[16px] font-bold hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              장바구니 담기
            </Button>
          </div>
        </div>
      </div>

      {/* 하단 상세 이미지 영역 */}
      <div className="mt-[100px] flex flex-col items-center border-t border-[#eee] pt-[40px]">
        <div className="relative w-full rounded-[10px]">
          <Image
            src={detailImage}
            alt="상세 정보"
            width={1050}
            height={750}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}

function DetailRow({
  label,
  value,
  subValue,
}: {
  label: string
  value: string
  subValue?: string
}) {
  return (
    <div className="flex border-b border-[#f4f4f4] py-[16px] text-[14px] leading-[20px]">
      <div className="w-[128px] shrink-0 font-medium text-[#666]">{label}</div>
      <div className="flex flex-col text-[#333]">
        <div>{value}</div>
        {subValue && (
          <div className="mt-[4px] text-[12px] leading-[18px] text-[#666]">
            {subValue}
          </div>
        )}
      </div>
    </div>
  )
}
