'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type SidebarItemProps = {
  title: string
  logo: React.ReactNode
  href: string
}

export default function SidebarItem({ title, logo, href }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <>
      <Link
        href={href}
        className={cn(
          'mb-2 flex gap-2 rounded-md px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-deepBlue font-semibold text-primary-foreground'
            : 'hover:bg-gray-100',
        )}
      >
        {logo}
        {title}
      </Link>
    </>
  )
}
