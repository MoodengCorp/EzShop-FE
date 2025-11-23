import Link from 'next/link'
import { Apple, Carrot, Fish, Beef, Croissant, GlassWater } from 'lucide-react'

const IconWrapper = ({ Icon }: { Icon: any }) => (
  <Icon
    className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-mainBlue"
    strokeWidth={1.5}
  />
)

const categories = [
  { name: '과일', icon: Apple },
  { name: '채소', icon: Carrot },
  { name: '해산물', icon: Fish },
  { name: '정육', icon: Beef },
  { name: '베이커리', icon: Croissant },
  { name: '음료', icon: GlassWater },
]

export default function HomeCategory() {
  return (
    <div className="flex justify-center border-b py-4 shadow-[0_4px_8px_-1px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex w-[1050px] flex-col">
        {/*<div className="pb-3 text-[18px] font-bold text-gray-600">카테고리</div>*/}

        <div className="flex items-center justify-between">
          {categories.map(({ name, icon: Icon }) => (
            <Link
              href={`/item?category=${name}`}
              key={name}
              className="group relative flex w-[150px] flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-paleBlue/20 transition-all duration-300 group-hover:bg-paleBlue/40">
                <IconWrapper Icon={Icon} />
              </div>
              <span className="relative mt-2 text-[14px] text-gray-700 group-hover:text-mainBlue">
                {name}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-mainBlue transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
