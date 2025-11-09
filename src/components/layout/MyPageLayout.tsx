import Sidebar from '@/components/ui_custom/Sidebar'
import { ReactNode } from 'react'

type MyPageLayoutProps = {
  children: ReactNode
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="flex w-[1050px] gap-6 bg-[#F2F5F8] py-12 overflow-hidden">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  )
}
