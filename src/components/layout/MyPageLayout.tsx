import Sidebar from '@/components/ui_custom/Sidebar'
import { ReactNode } from 'react'

type MyPageLayoutProps = {
  children: ReactNode
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="flex w-[1050px] gap-6">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}