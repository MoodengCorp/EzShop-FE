import type { Product } from '@/types'

// 다른 이미지 url 오류 나서, 해당 이미지 url로 공통으로 임시 처리
const img =
  'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/c4d41015-d188-4c68-b3e9-36968bf2110a.jpeg'

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: '[사미헌] 갈비탕', price: 11700, thumbnailUrl: img },
  {
    id: 2,
    name: '[귤로장생] 타이벡 감귤 2.5kg (로얄과)',
    price: 15900,
    thumbnailUrl: img,
  },
  {
    id: 3,
    name: '[압구정주꾸미] 주꾸미 볶음 2종 (택1)',
    price: 6900,
    thumbnailUrl: img,
  },
  {
    id: 4,
    name: '[주말특가] 고랭지 햇사과 1.3kg',
    price: 14900,
    thumbnailUrl: img,
  },
  { id: 5, name: '[조선호텔] 떡갈비 345g', price: 8910, thumbnailUrl: img },
  {
    id: 6,
    name: '[겨울간식] 삼립 호빵 5종 골라담기 (택1)',
    price: 4304,
    thumbnailUrl: img,
  },
  {
    id: 7,
    name: '[KF365] 호박고구마 800g (25년 햇)',
    price: 4990,
    thumbnailUrl: img,
  },
  {
    id: 8,
    name: '[이연복의 목란] 짬뽕 2인분 (맵기선택)',
    price: 13050,
    thumbnailUrl: img,
  },
  {
    id: 9,
    name: '[골라담기] 농심 컵라면 7종 (택2)',
    price: 4650,
    thumbnailUrl: img,
  },
  {
    id: 10,
    name: '[쁘띠봉봉 X 컬리] 치밥하기 좋은 순살 바베큐치킨',
    price: 11990,
    thumbnailUrl: img,
  },
  {
    id: 11,
    name: '[KF365] 한돈 삼겹살 구이용 600g~ (냉장)',
    price: 13540,
    thumbnailUrl: img,
  },
  {
    id: 12,
    name: '[제일맛계컬리] 육즙+왕교자 만두 1.01kg',
    price: 8483,
    thumbnailUrl: img,
  },
]
