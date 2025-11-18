import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function ViewAllCard({
  href,
  label = '전체보기',
}: {
  href: string
  label?: string
}) {
  return (
    <div className="w-full rounded-none">
      <div className="flex aspect-[10/13] w-full flex-col items-center justify-center">
        <Link
          href={href}
          className="flex h-[65px] w-[65px] items-center justify-center rounded-full border border-gray-300 bg-white/95 shadow-sm hover:bg-gray-50"
        >
          <ChevronRight
            className="h-12 w-12 pl-[3px] text-mainBlue"
            strokeWidth={1.3}
          />
        </Link>

        <p className="mt-3 text-main font-medium leading-tight text-black">
          {label}
        </p>
      </div>
    </div>
  )
}
