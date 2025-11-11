import { useRouter } from 'next/router'

// 임시 카테고리 페이지
export default function CategoryPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1 className="font-bold">{id} 카테고리</h1>
      <p className="text-gray-600">
        여기에 {id} category에 해당하는 상품들이 표시되는 페이지입니다.
      </p>
    </div>
  )
}
