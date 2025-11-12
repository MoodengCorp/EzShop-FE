import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Heart, Search, ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-[1050px] overflow-hidden mx-auto my-0">
      <div className="flex items-center justify-end gap-2 pt-4 mt-4 text-xs text-muted-foreground">
        <Link href="/auth/Signup" className="">회원가입</Link>
        <Separator orientation="vertical" className="h-3"></Separator>
        <Link href="/auth/Login">로그인</Link>
      </div>
      <div className="flex justify-between items-center h-16">
        <Link href={"/"}>
          <Image width={150} height={90} src="/ezshop_logo.png" alt="logo" />
        </Link>
        <div className="flex px-4 border-2 rounded-2xl w-[400px] h-12">
          <input type="text" placeholder="검색어를 입력해주세요" className="w-full" />
          <button>
            <Search />
          </button>
        </div>
        <div className="flex gap-4 w-[150px] justify-end">
          <Link href="/cart">
            <ShoppingCart />
          </Link>
          <Heart />
        </div>
      </div>
    </header>
  )
}