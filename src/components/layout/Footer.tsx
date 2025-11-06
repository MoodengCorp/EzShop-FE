import Link from 'next/link'
import { BoxWithDesc } from '@/components/ui_custom/BoxWithDesc'
import Image from 'next/image'
import { TextGray } from '@/components/ui_custom/TextGray'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center overflow-hidden mx-auto my-0">
      <div className="w-[1050px] flex text-muted-foreground px-6 py-6 gap-4">
        <div className="w-[500px]">
          <p className="text-xl mb-4 font-medium">고객행복센터</p>
          <div className="flex items-end gap-2 mb-6">
            <p className="text-3xl font-extrabold">1234-5678</p>
            <p className="text-sm pb-1">월~토요일 오전 7시 ~ 오후 6시</p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 mb-4">
              <BoxWithDesc title={'카카오톡 문의'}
                           descriptions={[['월~토요일', '오전 7시 - 오후 6시'], ['일/공휴일', '오전7시 - 오후1시']]}>
              </BoxWithDesc>
              <BoxWithDesc title={'1:1 문의'}
                           descriptions={[['365일'], ['고객센터 운영시간에 순차적으로 답변드리겠습니다.']]}>
              </BoxWithDesc>
              <BoxWithDesc title={'대량주문 문의'}
                           descriptions={[['월~금요일', '오전 9시 - 오후 6시'], ['점심시간', '낮 12시 - 오후 1시']]}>
              </BoxWithDesc>
            </div>
            <p className="text-xs text-gray-400">비회원 문의 : moodeng@moodengcorp.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 text-xs text-muted-foreground font-bold mb-4">
            <Link href="/#">회사소개</Link>
            <Link href="/#">소개영상</Link>
            <Link href="/#">투자정보</Link>
            <Link href="/#">인재채용</Link>
            <Link href="/#">이용약관</Link>
            <Link href="/#">개인정보처리방침</Link>
            <Link href="/#">이용안내</Link>
            <Link href="/#">입점신청</Link>
          </div>
          <div className="flex flex-col mb-4">
            <TextGray
              descriptions={[
                ['법인명 (상호) : 주식회사 무댕', '사업자등록번호 : 123-12-123456'],
                ['통신판매업 : 제 2020-경기안양-12345호'],
                ['주소 : 경기도 안양시 귀인로 123, 12층', '대표이사 : 손병찬'],
                ['채용문의 : moodeng@moodengcorp.com'],
                ['팩스: 070 - 1234 - 1234']
              ]}
            />
          </div>
          <div className="flex gap-2">
            <Image className="cursor-pointer" width="30" height="30" src="/ico_instagram.png" alt="asdasd" />
            <Image className="cursor-pointer" width="30" height="30" src="/ico_fb.png" alt="asdasd" />
            <Image className="cursor-pointer" width="30" height="30" src="/ico_blog.png" alt="asdasd" />
            <Image className="cursor-pointer" width="30" height="30" src="/ico_youtube.png" alt="asdasd" />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-dvw text-center text-xs text-muted-foreground py-8">
        EZ-Shop에서 판매되는 상품 중에는 moodeng에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
        <br />
        마켓플레이스(오픈마켓) 상품의 경우 moodeng은 통신판매중개자로서 통신판매의 당사자가 아닙니다. moodeng은 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
        <br />
        <br />
        MOODENG CORP. ALL RIGHTS RESERVED
      </div>
    </footer>
  )
}