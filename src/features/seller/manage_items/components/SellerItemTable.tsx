import { ItemDetailResponse } from '@/features/item/types/item'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ITEM_STATUS_KR } from '@/features/seller/constants/seller-constants'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ItemDetailModal } from '@/features/seller/manage_items/components/ItemDetailModal'

type SellerItemTableProps = {
  items: ItemDetailResponse[]
  isLoading?: boolean
  onRefresh?: () => void
}

export function SellerItemTable({
  items,
  isLoading,
  onRefresh,
}: SellerItemTableProps) {
  const [selectedItem, setSelectedItem] = useState<ItemDetailResponse | null>(
    null,
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleViewDetail = (item: ItemDetailResponse) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }
  const handleStatusUpdate = () => {
    onRefresh?.()
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    )
  }

  if (items.length == 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">주문 내역이 없습니다.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>상품 정보</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>재고</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>조회</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell className="mx-2 my-2 flex items-center gap-3">
                  <Image
                    src={item.thumbnailUrl}
                    alt="thumbnail"
                    width={56}
                    height={72}
                    className="rounded-lg"
                  />
                  {item.name} <br />
                  {item.weight}g
                </TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.stockQuantity}</TableCell>
                <TableCell>{ITEM_STATUS_KR[item.itemStatus]}</TableCell>
                <TableCell>
                  <Button
                    className="bg-deepBlue hover:bg-deepBlue/90"
                    onClick={() => handleViewDetail(item)}
                  >
                    조회
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  )
}
