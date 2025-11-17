import Sidebar from '@/components/common/Sidebar'
import { ReactNode } from 'react'

type MyPageLayoutProps = {
  children: ReactNode
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div className="w-full bg-[#F2F5F8] overflow-x-hidden">
      <div className="flex justify-center py-12 min-w-[1050px]">
        <div className="flex w-[1050px] gap-6 px-4">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
