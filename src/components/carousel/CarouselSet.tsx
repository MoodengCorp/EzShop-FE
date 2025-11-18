import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Item } from '@/types'
import ItemCarousel from '@/components/carousel/ItemCarousel'

export type Props = {
  title: string
  subtitle?: string
  items: Item[]
  viewAllHref: string
  icon?: ReactNode
  className?: string
}

export default function CarouselSet({
  title,
  subtitle,
  items,
  viewAllHref,
  icon = <span className="text-2xl">🛒</span>,
  className,
}: Props) {
  return (
    <section
      className={`flex flex-col items-center space-y-3 py-10 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-[28px] font-bold leading-none tracking-tight text-gray-700">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          aria-label="전체보기"
          className="inline-flex items-center text-gray-400 hover:text-gray-700"
        >
          <ChevronRight className="h-7 w-7" />
        </Link>
      </div>

      {subtitle && (
        <p className="text-center text-sm text-gray-400">{subtitle}</p>
      )}

      <ItemCarousel items={items} viewAllHref={viewAllHref} />
    </section>
  )
}
