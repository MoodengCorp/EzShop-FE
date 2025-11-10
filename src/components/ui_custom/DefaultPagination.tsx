import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type DefaultPaginationProps = {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
  maxVisiblePages?: number
}

export default function DefaultPagination({
                                            currentPage,
                                            totalPages,
                                            onPageChange,
                                            maxVisiblePages = 5,
                                          }: DefaultPaginationProps) {
  // 표시할 페이지 번호 계산
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const pages: (number | 'ellipsis')[] = []
    // 현재 페이지의 좌우 인덱스
    const leftSiblingIndex = Math.max(currentPage - 1, 1)
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages)

    // 좌 인덱스가 2보다 크면 ...
    // 우 인덱스가 최대 인덱스 - 1 보다 작으면 ...
    const shouldShowLeftEllipsis = leftSiblingIndex > 2
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1
    // 왼쪽으로는 3 페이지 이하로 남았고 오른쪽으로는 3 페이지 이상 남았을 때
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftRange = Array.from({ length: 4 }, (_, i) => i + 1)
      pages.push(...leftRange, 'ellipsis', totalPages)
      // 왼쪽으로는 3 페이지 이상 남았고 오른쪽으로는 3 페이지 이하 남았을 때
    } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightRange = Array.from({ length: 4 }, (_, i) => totalPages - 3 + i)
      pages.push(1, 'ellipsis', ...rightRange)
      // 좌우로 다 3페이지 이상 남았을 때
    } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      pages.push(1, 'ellipsis', leftSiblingIndex, currentPage, rightSiblingIndex, 'ellipsis', totalPages)
      // 좌우로 다 3페이지 미만 남았을 때
    } else {
      pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1))
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-gray-100'}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={`page-${index}`}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer hover:bg-gray-100"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer hover:bg-gray-100'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}