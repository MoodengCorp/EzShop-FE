import { Separator } from '@/components/ui/separator'
import SidebarItem from '@/features/user/components/SidebarItem'
import { CircleUserRound, Component, Info, LayoutList } from 'lucide-react'
import { useAuth } from '@/features/auth'

export default function Sidebar() {
  const { storeRole, name } = useAuth()

  return (
    <>
      <div className="flex h-fit w-48 flex-col rounded-2xl border-[1px] border-gray-200 bg-white px-4 py-4 shadow">
        <div className="flex items-center gap-4 pb-4">
          <CircleUserRound className="size-8" />
          <div>
            <div className="text-sm font-bold">{name}님</div>
            <div className="text-xs text-muted-foreground">{storeRole === 'SELLER' ? "입점회원" : "일반회원"}</div>
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
          {storeRole === 'SELLER' && (
            <>
              <Separator className="mb-2"/>
              <SidebarItem
                title="상품 관리"
                logo={<Component className="size-5" />}
                href="/mypage/seller/manage-items"
              />
              <SidebarItem
                title="주문 관리"
                logo={<Component className="size-5" />}
                href="/mypage/seller/manage-orders"
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}
