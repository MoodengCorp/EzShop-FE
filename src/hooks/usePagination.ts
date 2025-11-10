import { useMemo, useState } from 'react'

type UsePaginationProps<T> = {
  data: T[]
  itemsPerPage?: number
  initialPage?: number
}

type UsePaginationReturn<T> = {
  currentPage: number
  totalPages: number
  currentData: T[]
  goToPage: (page: number) => void
  nextPage: () => void
  previousPage: () => void
  resetPage: () => void
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export function usePagination<T>({
  data,
  itemsPerPage = 5,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  // 시작 페이지를 시작값으로 페이지의 상태 저장
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  // 현재 페이지 데이터
  const currentData = useMemo(() => {
    // 2페이지면 1페이지까지의 데이터를 생략하고
    const startIndex = (currentPage - 1) * itemsPerPage
    // 2페이지부터 한 페이지분량만큼의 데이터 만큼
    const endIndex = startIndex + itemsPerPage
    // 그만큼의 데이터를 슬라이스 해서 리턴
    return data.slice(startIndex, endIndex)
  }, [data, currentPage, itemsPerPage])

  // 페이지 이동 함수들
  const goToPage = (page: number)=> {
    // 1페이지보다 낮은 페이지로 이동 불가
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
    window.scrollTo({top:0, behavior: 'smooth'})
  }

  const nextPage = () => {
    // 현재 페이지가 전체 페이지보다 낮다면 가능하도록
    // 사실 비활성화시키는 게 제일 좋지만 일단 이렇게 하는 듯
    if(currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if(currentPage > 1){
      goToPage(currentPage - 1)
    }
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
