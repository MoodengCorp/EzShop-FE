import ProductCarousel from '@/components/carousel/ProductCarousel'
import { Products } from '@/mock/Products'

export default function Home() {
  return (
    <div className="mx-auto py-10">
      <ProductCarousel products={Products} viewAllHref="/temp" />
    </div>
  )
}
