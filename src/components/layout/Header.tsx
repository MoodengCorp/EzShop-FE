import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Heart, Search, ShoppingCart } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import DefaultDropdown from '@/components/common/DefaultDropdown'
import { useCart } from '@/features/cart/hooks/useCart'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const { isAuthenticated, name, logout } = useAuth()
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const { data: cartData } = useCart()
  const totalCount = cartData?.totalCount ?? 0

  const handleSearch = (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = keyword.trim()
    if (!trimmed) return
    router.push({
      pathname: '/item',
      query: { keyword: trimmed },
    })
  }

  return (
    <header className="mx-auto my-0 w-[1050px] overflow-hidden">
      <div className="mt-4 flex items-center justify-end gap-2 pt-4 text-xs">
        {isAuthenticated && name ? (
          <>
            <Link href="/mypage/orders">
              <DefaultDropdown
                title={name}
                dropdownItemElements={[
                  {
                    dropdownItemName: '주문내역',
                    dropdownItemLink: '/mypage/orders',
                  },
                  {
                    dropdownItemName: '내 정보 관리',
                    dropdownItemLink: '/mypage/profile',
                  },
                  {
                    dropdownItemName: '로그아웃',
                    dropdownItemLink: '/',
                    onClickAction: () => {
                      logout()
                    },
                  },
                ]}
              />
            </Link>
          </>
        ) : (
          <>
            <Link href="/auth/Signup" className="text-muted-foreground">
              회원가입
            </Link>
            <Separator orientation="vertical" className="h-3"></Separator>
            <Link href="/auth/Login" className="text-muted-foreground">
              로그인
            </Link>
          </>
        )}
      </div>
      <div className="flex h-16 items-center justify-between">
        <Link href={'/'}>
          <Image width={150} height={90} src="/ezshop_logo.png" alt="logo" />
        </Link>
        <form
          className="flex h-12 w-[400px] rounded-2xl border-2 px-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" aria-label="상품 검색">
            <Search />
          </button>
        </form>
        <div className="flex w-[150px] justify-end gap-4">
          <Link href={'/cart'}>
            <div className="relative cursor-pointer">
              <ShoppingCart />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-deepBlue text-[10px] font-bold text-white">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </div>
          </Link>
          <Heart />
        </div>
      </div>
    </header>
  )
}
