import { Separator } from '@/components/ui/separator'
import SidebarItem from '@/components/ui_custom/SidebarItem'
import { CircleUserRound, Component, Info, LayoutList } from 'lucide-react'

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col w-48 h-56 rounded-2xl bg-white border-[1px] border-gray-200 px-4 py-4 shadow">
        <div className="flex items-center gap-4 pb-4">
          <CircleUserRound className="size-8" />
          <div>
            <div className="text-sm font-bold">김컬리님</div>
            <div className="text-xs text-muted-foreground">일반회원</div>
          </div>
        </div>
        <Separator orientation="horizontal" className="mb-4 w-full"></Separator>
        <div>
          <SidebarItem
            title="주문 내역"
            logo={<LayoutList className="size-5" />}
            href="/mypage/orders"
          />
          <SidebarItem
            title="내 정보 관리"
            logo={<Info className="size-5" />}
            href="/mypage/profile"
          />
          <SidebarItem
            title="쿠폰"
            logo={<Component className="size-5" />}
            href="/mypage/coupons"
          />
        </div>
      </div>
    </>
  )
}