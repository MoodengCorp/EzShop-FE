import BannerCarousel from '@/components/carousel/BannerCarousel'
import CarouselSet from '@/components/carousel/CarouselSet'
import ProductCarousel from '@/components/carousel/ProductCarousel'
import HomeCategory from '@/components/ui_custom/HomeCategory'
import { MOCK_PRODUCTS } from '@/mocks/products'

export default function Home({ best, meat }: any) {
  return (
    <div className="mx-auto flex flex-col">
      <section
        className="z-20 mx-auto w-[clamp(1050px,100vw,1900px)]"
        aria-label="카테고리"
      >
        <HomeCategory />
      </section>

      <section
        id="hero-banners"
        className="z-10 mx-auto w-[clamp(1050px,100vw,1900px)]"
        aria-label="배너"
      >
        <BannerCarousel />
      </section>

      <section className="mx-auto mt-12 flex w-full justify-center">
        <div className="w-[1050px]">
          <CarouselSet
            title="지금 가장 많이 담는 특가"
            subtitle="꼭 담아야 할 추천 특가템 최대 60% OFF"
            products={MOCK_PRODUCTS}
            viewAllHref="/temp"
          />
        </div>
      </section>

      <section className="mx-auto mt-12 flex w-full justify-center">
        <div className="w-[1050px]">
          <CarouselSet
            title="정육 특가 모음"
            subtitle="신선한 정육을 합리적인 가격에"
            products={MOCK_PRODUCTS}
            viewAllHref="/temp"
            icon={<span className="text-2xl">🥩</span>}
          />
        </div>
      </section>
    </div>
  )
}
