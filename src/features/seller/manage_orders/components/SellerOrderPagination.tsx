// src/features/orders/components/seller/SellerOrderPagination.tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { PaginationDto } from '@/types/common'

type SellerOrderPaginationProps = {
  pagination: PaginationDto
  onPageChange: (page: number) => void
}

export function SellerOrderPagination({ pagination, onPageChange }: SellerOrderPaginationProps) {
  const { page: currentPage, totalPage, hasNext, hasPrev } = pagination

  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5

    if (totalPage <= maxVisible) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPage)
      } else if (currentPage >= totalPage - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPage - 3; i <= totalPage; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPage)
      }
    }

    return pages
  }

  if (totalPage <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => hasPrev && onPageChange(currentPage - 1)}
            className={!hasPrev ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum, index) =>
          pageNum === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => onPageChange(pageNum)}
                isActive={currentPage === pageNum}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => hasNext && onPageChange(currentPage + 1)}
            className={!hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}