import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import type { Item } from '@/types/item'
import ViewAllCard from './ViewAllCard'
import ItemCard from './ItemCard'

interface Props {
  items: Item[]
  viewAllHref: string
}

export default function ItemCarousel({ items, viewAllHref }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [snap, setSnap] = useState(0)

  const wheelPlugin = useMemo(
    () => WheelGesturesPlugin({ forceWheelAxis: 'x' }),
    [],
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSnap(api.selectedScrollSnap())
    api.on('select', onSelect)

    let locked = false
    const root = api.rootNode()

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      e.preventDefault()
      if (locked) return
      if (e.deltaX === 0) return

      locked = true

      if (e.deltaX > 0) api.scrollNext()
      else api.scrollPrev()
    }

    const unlock = () => {
      locked = false
    }

    api.on('settle', unlock)
    root.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      root.removeEventListener('wheel', onWheel)
      api.off('select', onSelect)
      api.off('settle', unlock)
    }
  }, [api])

  const handleNext = () => api?.scrollNext()
  const handlePrev = () => api?.scrollPrev()

  return (
    <div className="relative w-full px-4">
      <Carousel
        setApi={setApi}
        opts={{
          axis: 'x',
          align: 'start',
          slidesToScroll: 4,
          dragFree: false,
          skipSnaps: false,
          containScroll: 'trimSnaps',
          loop: false,
          duration: 20,
        }}
        plugins={[wheelPlugin]}
      >
        <CarouselContent className="-ml-[9px] touch-pan-x">
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-1/4 px-[9px]">
              <ItemCard item={item} />
            </CarouselItem>
          ))}

          <CarouselItem className="basis-1/4 px-[9px]">
            <ViewAllCard href={viewAllHref} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {snap > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[-10px] top-[160px] z-10 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow"
        >
          <ChevronLeft
            className="h-8 w-8 pr-[3px]"
            style={{ strokeWidth: 1.4 }}
          />
        </button>
      )}

      {api && snap < api.scrollSnapList().length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-[-10px] top-[160px] z-10 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow"
        >
          <ChevronRight
            className="h-8 w-8 pl-[3px]"
            style={{ strokeWidth: 1.4 }}
          />
        </button>
      )}
    </div>
  )
}
