import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

type BannerItem = {
  id: string | number
  src: string
  alt?: string
  href?: string
}

const BANNERS: BannerItem[] = [
  { id: 1, src: '/banner/banner1.png', alt: '배너 1' },
  { id: 2, src: '/banner/banner2.png', alt: '배너 2' },
  { id: 3, src: '/banner/banner3.png', alt: '배너 3' },
  { id: 4, src: '/banner/banner4.png', alt: '배너 4' },
  { id: 5, src: '/banner/banner5.png', alt: '배너 5' },
]

export default function BannerCarousel({
  items = BANNERS,
}: {
  items?: BannerItem[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }))
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [open, setOpen] = useState(false)
  const total = items.length

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    setIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const handlePrev = () => {
    if (!api) return
    api.scrollPrev()

    // ★ 핵심 수정: api.plugins()를 통해 실행 중인 오토플레이 인스턴스를 가져와서 리셋
    // (Ref를 직접 쓰는 것보다 안전합니다)
    const autoplay = api.plugins()?.autoplay
    if (autoplay && playing) {
      autoplay.reset()
    }
  }

  const handleNext = () => {
    if (!api) return
    api.scrollNext()

    const autoplay = api.plugins()?.autoplay
    if (autoplay && playing) {
      autoplay.reset()
    }
  }
  const pause = () => {
    autoplay.current.stop()
    setPlaying(false)
  }
  const play = () => {
    autoplay.current.play()
    setPlaying(true)
  }
  const togglePlay = () => (playing ? pause() : play())
  const openAll = () => {
    pause()
    setOpen(true)
  }

  return (
    <div className="w-full">
      <div className="group/hero relative h-[370px] w-full overflow-hidden">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: 'start' }}
          plugins={[autoplay.current]}
        >
          <CarouselContent className="ml-0 touch-pan-x gap-0 overscroll-x-contain">
            {items.map((item, i) => (
              <CarouselItem key={item.id} className="basis-full pl-0">
                {item.href ? (
                  <Link href={item.href} className="block">
                    <figure className="relative h-[370px] w-full overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt ?? ''}
                        fill
                        sizes="(max-width: 1900px) 100vw, 1900px"
                        className="object-cover"
                        priority={i === 0}
                      />
                    </figure>
                  </Link>
                ) : (
                  <figure className="relative h-[370px] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt ?? ''}
                      fill
                      sizes="(max-width: 1900px) 100vw, 1900px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </figure>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 배너 위 < > 화살표 버튼*/}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-4">
          <button
            onClick={handlePrev}
            className="pointer-events-auto ml-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white"
          >
            <ChevronLeft
              className="h-7 w-7 pr-1 md:h-8 md:w-8"
              style={{ strokeWidth: 1.3 }}
            />
          </button>
          <button
            onClick={handleNext}
            className="pointer-events-auto mr-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white"
          >
            <ChevronRight
              className="h-7 w-7 pl-1 md:h-8 md:w-8"
              style={{ strokeWidth: 1.3 }}
            />
          </button>
        </div>

        {/* 우하단 버튼 : 일시정지/시작 , 전체보기 버튼 */}
        <div className="absolute inset-0 bottom-5 z-10 mx-48 flex items-end justify-end gap-2">
          <button
            onClick={togglePlay}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white"
            aria-label={playing ? '일시정지' : '재생'}
          >
            {playing ? (
              <Pause className="h-3 w-3" fill="currentColor" stroke="none" />
            ) : (
              <Play className="h-3 w-3" fill="currentColor" stroke="none" />
            )}
          </button>
          <button
            onClick={openAll}
            className="flex h-7 items-center justify-evenly rounded-full bg-black/50 px-1.5 text-sm font-semibold text-white"
          >
            <span className="pl-1 font-bold tabular-nums">{index + 1}</span>
            <span className="px-0.5 text-[8px] opacity-70">|</span>
            <span className="tabular-nums opacity-70">{total}</span>
            <span className="ml-1 hidden sm:inline">전체보기</span>
            <ChevronRight className="ml-0.5 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 전체보기 모달 */}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) play()
        }}
      >
        <DialogContent className="max-h-[85vh] w-[800px] max-w-[92vw] overflow-hidden p-0">
          <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white px-6 pb-3 pt-4 before:absolute before:bottom-0 before:left-6 before:right-6 before:h-[1px] before:bg-gray-300/70 before:content-['']">
            <DialogTitle className="text-2xl font-semibold text-gray-700">
              이벤트 전체보기
            </DialogTitle>
            <DialogClose
              className="rounded-full p-1 text-gray-700 hover:bg-gray-100/70"
              aria-label="닫기"
            >
              <X className="h-7 w-7 md:h-8 md:w-8" style={{ strokeWidth: 1 }} />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          <div className="max-h-[calc(85vh-70px)] overflow-y-auto px-6 pb-6 pt-4">
            {items.map((it) => (
              <div
                key={it.id}
                className="relative mb-3 h-[185px] w-full overflow-hidden rounded-md"
              >
                <Image
                  src={it.src}
                  alt={it.alt ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 800px) 92vw, 770px"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
