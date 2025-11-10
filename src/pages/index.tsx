import CarouselItem from '@/components/ui_custom/CarouselItem'
import { CarouselItems } from '@/mock/CarouselItems'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>메인 페이지 구현 전까지 라우팅 가능한 페이지 목록 나열</h1>
      <div className="flex flex-col">
        <Link href="/auth/Signup">회원가입</Link>
        <Link href="/auth/Login">로그인</Link>
        <Link href="/mypage/orders">마이페이지</Link>

        <div className="p-4">
          <CarouselItem item={CarouselItems[0]} />
        </div>
      </div>
    </>
  )
}
