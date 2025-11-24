'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Apple,
  Carrot,
  Fish,
  Beef,
  Croissant,
  GlassWater,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Cookie,
  Milk,
  Wine,
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useCategories } from '@/features/category/hooks/useCategories'

// 왼쪽이 categoryName, 오른쪽이 lucide icon 명칭
const CATEGORY_ICONS: Record<string, any> = {
  vegetable: Carrot,
  fruit: Apple,
  seafood: Fish,
  meat: Beef,
  mealkit: CookingPot,
  drinks: GlassWater,
  snacks: Cookie,
  bakery: Croissant,
  dairy: Milk,
  alcohol: Wine,
}

// 매칭되는 아이콘 없을시, 기본 아이콘 사과로 설정
const IconWrapper = ({ Icon }: { Icon: any }) => {
  if (!Icon) return <Apple className="h-6 w-6 text-gray-400" />

  return (
    <Icon
      className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-mainBlue"
      strokeWidth={1.5}
    />
  )
}

export default function HomeCategory() {
  const [api, setApi] = useState<CarouselApi>()

  const { data: categories } = useCategories()

  const handlePrev = () => {
    api?.scrollPrev()
  }

  const handleNext = () => {
    api?.scrollNext()
  }

  return (
    <div className="flex w-full items-center justify-center border-b">
      <div className="flex w-full max-w-[1250px] items-center justify-center gap-6 px-4">
        <button
          onClick={handlePrev}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/95 shadow"
        >
          <ChevronLeft
            className="h-7 w-7 pr-1 text-black/80 md:h-8 md:w-8"
            style={{ strokeWidth: 1.3 }}
          />
        </button>

        <div className="w-[1050px] py-4">
          <Carousel
            setApi={setApi}
            opts={{ align: 'start', loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categories &&
                categories.map((category) => {
                  const IconComponent = CATEGORY_ICONS[category]

                  return (
                    <CarouselItem
                      key={category}
                      className="basis-1/3 pl-4 md:basis-1/4 lg:basis-1/6"
                    >
                      <Link
                        href={`/item?category=${category}`}
                        className="group relative flex flex-col items-center justify-center py-2 text-center transition-transform duration-300 hover:scale-105"
                      >
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-paleBlue/20 transition-all duration-300 group-hover:bg-paleBlue/40">
                          <IconWrapper Icon={IconComponent} />
                        </div>
                        <span className="relative mt-2 text-[14px] text-gray-700 group-hover:text-mainBlue">
                          {category}
                          <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-mainBlue transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </CarouselItem>
                  )
                })}
            </CarouselContent>
          </Carousel>
        </div>

        <button
          onClick={handleNext}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/95 shadow"
        >
          <ChevronRight
            className="h-7 w-7 pl-1 md:h-8 md:w-8"
            style={{ strokeWidth: 1.3 }}
          />
        </button>
      </div>
    </div>
  )
}
