import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

// 컴포넌트
import Layout from '@/components/layout/Layout'
import ItemCard from '@/components/carousel/ItemCard'
import DefaultPagination from '@/components/common/DefaultPagination'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useItems } from '@/features/item/hooks/useItem'

// 정렬 옵션
const SORT_OPTIONS = [
  { label: '신상품순', value: 1 },
  { label: '높은 가격순', value: 2 },
  { label: '낮은 가격순', value: 3 },
]

export default function ItemListPage() {
  const router = useRouter()

  const { category, keyword } = router.query

  const [currentPage, setCurrentPage] = useState(1)
  const [sortedType, setSortedType] = useState(1)
  const pageSize = 20

  // 파라미터 정리
  const categoryName = typeof category === 'string' ? category : undefined
  const searchKeyword = typeof keyword === 'string' ? keyword : undefined

  // 데이터 Fetching
  const {
    data: response,
    isLoading,
    isError,
  } = useItems({
    categoryName: categoryName,
    keyword: searchKeyword,
    page: currentPage,
    perPage: pageSize,
    sortedType: sortedType,
  })

  const searchData = response?.data

  const items = searchData?.items || []

  const pagination = searchData?.pagination
  const totalPages = pagination?.totalPage || 0 // DTO 필드명: totalPage
  const totalElements = pagination?.totalCount || 0 // DTO 필드명: totalCount

  let pageTitle = ''
  let subTitle = ''

  if (searchKeyword) {
    pageTitle = `'${searchKeyword}' 검색 결과`
    subTitle = `검색하신 상품을 찾아보았습니다.`
  } else if (categoryName) {
    pageTitle = categoryName
    subTitle = `${categoryName} 카테고리의 추천 상품을 만나보세요.`
  } else {
    pageTitle = '전체 상품'
    subTitle = 'EzShop의 모든 상품을 만나보세요.'
  }

  // 이벤트 핸들러
  useEffect(() => {
    setCurrentPage(1)
    setSortedType(1)
  }, [category, keyword])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="x-[1050px] flex justify-center py-8">
      <div className="container flex flex-col">
        {/* 상단 헤더 */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="mt-2 text-gray-500">{subTitle}</p>
        </div>

        {/* 컨트롤 영역 */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b pb-4 md:flex-row md:items-end">
          <span className="text-sm font-medium text-gray-500">
            총 <span className="font-bold text-black">{totalElements}</span>개의
            상품
          </span>

          {/* 정렬 필터 */}
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            {SORT_OPTIONS.map((option, index) => (
              <div key={option.value} className="flex items-center">
                {index > 0 && <span className="mx-3 text-gray-300">|</span>}
                <button
                  onClick={() => {
                    setSortedType(option.value)
                    setCurrentPage(1)
                  }}
                  className={cn(
                    'transition-colors hover:text-black',
                    sortedType === option.value
                      ? 'font-bold text-black'
                      : 'font-medium',
                  )}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 상품 목록 리스트 */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[320px] w-full rounded-xl bg-gray-200" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-2/3 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-red-500">
              상품을 불러오는 중 오류가 발생했습니다.
            </p>
            <button
              onClick={() => router.reload()}
              className="rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
            >
              새로고침
            </button>
          </div>
        ) : items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <ItemCard key={item.itemId} item={item} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <DefaultPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="rounded-lg border bg-gray-50 py-32 text-center">
            <p className="text-lg text-gray-500">
              해당 조건에 맞는 상품이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
