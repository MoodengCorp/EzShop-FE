// src/features/seller/manage_items/components/ItemDetailModal.tsx
import { useState } from 'react'
import { ItemDetailResponse, ItemStatus } from '@/features/item/types/item'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { toast } from 'sonner'
import { Upload, X } from 'lucide-react'
import { useUpdateItem, useUpdateItemStatus } from '@/features/seller/manage_items/hooks/useSellerItems'

type ItemDetailModalProps = {
  item: ItemDetailResponse | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate?: () => void
}

// 상품 상태 한글 매핑
const ITEM_STATUS_KR: Record<ItemStatus, string> = {
  ACTIVE: '판매중',
  SOLDOUT: '품절',
  HIDDEN: '숨김',
}

// 배송 타입 한글 매핑
const DELIVERY_TYPE_KR = {
  FAST: '샛별배송',
  NORMAL: '일반배송',
}

export function ItemDetailModal({
                                  item,
                                  isOpen,
                                  onClose,
                                  onStatusUpdate,
                                }: ItemDetailModalProps) {
  const updateItemMutation = useUpdateItem()
  const updateStatusMutation = useUpdateItemStatus()

  const [isEditMode, setIsEditMode] = useState(false)
  const [editedItem, setEditedItem] = useState<ItemDetailResponse | null>(null)

  // 이미지 파일 상태
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [detailImageFile, setDetailImageFile] = useState<File | null>(null)

  // 이미지 미리보기 URL 상태
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [detailImagePreview, setDetailImagePreview] = useState<string | null>(null)

  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  if (!item) return null

  // 편집 모드 시작
  const handleEditStart = () => {
    setEditedItem({ ...item })
    setIsEditMode(true)
    // 미리보기 초기화
    setThumbnailPreview(null)
    setDetailImagePreview(null)
    setThumbnailFile(null)
    setDetailImageFile(null)
  }

  // 편집 취소
  const handleEditCancel = () => {
    setEditedItem(null)
    setIsEditMode(false)
    // 미리보기 URL 정리
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)
    if (detailImagePreview) URL.revokeObjectURL(detailImagePreview)
    setThumbnailPreview(null)
    setDetailImagePreview(null)
    setThumbnailFile(null)
    setDetailImageFile(null)
  }

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof ItemDetailResponse, value: any) => {
    if (!editedItem) return
    setEditedItem({
      ...editedItem,
      [field]: value,
    })
  }

  // 썸네일 이미지 파일 선택
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.', { position: 'top-center' })
      return
    }

    // 파일 크기 검증 (예: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('이미지 크기는 5MB 이하여야 합니다.', { position: 'top-center' })
      return
    }

    setThumbnailFile(file)

    // 이전 미리보기 URL 정리
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview)
    }

    // 새로운 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file)
    setThumbnailPreview(previewUrl)
  }

  // 상세 이미지 파일 선택
  const handleDetailImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.', { position: 'top-center' })
      return
    }

    // 파일 크기 검증 (예: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('이미지 크기는 5MB 이하여야 합니다.', { position: 'top-center' })
      return
    }

    setDetailImageFile(file)

    // 이전 미리보기 URL 정리
    if (detailImagePreview) {
      URL.revokeObjectURL(detailImagePreview)
    }

    // 새로운 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file)
    setDetailImagePreview(previewUrl)
  }

  // 썸네일 이미지 제거
  const handleRemoveThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview)
    }
    setThumbnailFile(null)
    setThumbnailPreview(null)
  }

  // 상세 이미지 제거
  const handleRemoveDetailImage = () => {
    if (detailImagePreview) {
      URL.revokeObjectURL(detailImagePreview)
    }
    setDetailImageFile(null)
    setDetailImagePreview(null)
  }

  // 상품 정보 저장
  const handleSaveChanges = async () => {
    if (!editedItem) return

    // 유효성 검사
    if (!editedItem.name.trim()) {
      toast.error('상품명을 입력해주세요.', { position: 'top-center' })
      return
    }
    if (editedItem.price <= 0) {
      toast.error('가격은 0보다 커야 합니다.', { position: 'top-center' })
      return
    }
    if (editedItem.stockQuantity < 0) {
      toast.error('재고는 0 이상이어야 합니다.', { position: 'top-center' })
      return
    }

    try {
      // FormData 생성 (multipart/form-data로 전송)
      const formData = new FormData()

      // 텍스트 필드들 추가
      formData.append('categoryName', editedItem.categoryName)
      formData.append('name', editedItem.name)
      formData.append('origin', editedItem.origin)
      formData.append('deliveryType', editedItem.deliveryType)
      formData.append('packagingType', editedItem.packagingType)
      formData.append('price', editedItem.price.toString())
      formData.append('salesUnit', editedItem.salesUnit)
      formData.append('weight', editedItem.weight.toString())
      formData.append('stockQuantity', editedItem.stockQuantity.toString())

      // 이미지 파일 추가 (새로 업로드한 경우에만)
      if (thumbnailFile) {
        formData.append('thumbnailImage', thumbnailFile)
      }
      if (detailImageFile) {
        formData.append('detailImage', detailImageFile)
      }

      // 상품 정보 업데이트 API 호출
      await updateItemMutation.mutateAsync({
        itemId: editedItem.itemId,
        formData
      })

      toast.success('상품 정보가 수정되었습니다.', {
        position: 'top-center',
      })

      // 미리보기 URL 정리
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)
      if (detailImagePreview) URL.revokeObjectURL(detailImagePreview)

      setIsEditMode(false)
      setEditedItem(null)
      setThumbnailFile(null)
      setDetailImageFile(null)
      setThumbnailPreview(null)
      setDetailImagePreview(null)

      onStatusUpdate?.()
      onClose()
    } catch (error) {
      toast.error('상품 정보 수정에 실패했습니다.', {
        position: 'top-center',
      })
    }
  }

  // 상태 변경 핸들러
  const handleStatusChange = (newStatus: ItemStatus) => {
    setSelectedStatus(newStatus)
    setShowConfirmDialog(true)
  }

  // 상태 변경 확인
  const handleConfirmStatusChange = async () => {
    if (!selectedStatus) return

    try {
      await updateStatusMutation.mutateAsync({
        itemId: item.itemId,
        status:selectedStatus,
      })
      toast.success('상품 상태가 변경되었습니다.', {
        position: 'top-center',
      })
      setShowConfirmDialog(false)
      onStatusUpdate?.()
      onClose()
    } catch (error) {
      toast.error('상태 변경에 실패했습니다.', {
        position: 'top-center',
      })
    }
  }

  const isUpdating = updateItemMutation.isPending || updateStatusMutation.isPending

  const displayItem = editedItem || item

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>상품 상세 정보</DialogTitle>
              {!isEditMode ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditStart}
                  className="text-deepBlue border-deepBlue hover:bg-deepBlue hover:text-white"
                >
                  수정
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditCancel}
                    disabled={isUpdating}
                  >
                    취소
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveChanges}
                    disabled={isUpdating}
                    className="bg-deepBlue hover:bg-deepBlue/90"
                  >
                    {isUpdating ? '저장 중...' : '저장'}
                  </Button>
                </div>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* 상품 기본 정보 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-400">
                    상품 ID: {displayItem.itemId}
                  </p>
                  <p className="font-bold">{displayItem.name}</p>
                </div>
                {/* 상태 변경 드롭다운 - 편집 모드가 아닐 때만 표시 */}
                {!isEditMode && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">판매 상태:</span>
                    <Select
                      value={displayItem.itemStatus}
                      onValueChange={(value) =>
                        handleStatusChange(value as ItemStatus)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">
                          {ITEM_STATUS_KR.ACTIVE}
                        </SelectItem>
                        <SelectItem value="SOLDOUT">
                          {ITEM_STATUS_KR.SOLDOUT}
                        </SelectItem>
                        <SelectItem value="HIDDEN">
                          {ITEM_STATUS_KR.HIDDEN}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <Separator className="border-black" />
            </div>

            {/* 상품 이미지 */}
            <div>
              <p className="mb-3 text-lg font-bold">상품 이미지</p>
              <div className="grid grid-cols-2 gap-4">
                {/* 썸네일 이미지 */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">썸네일 이미지</p>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100">
                        <Image
                          className="object-cover"
                          fill
                          src={thumbnailPreview || displayItem.thumbnailUrl}
                          alt="썸네일"
                        />
                        {thumbnailPreview && (
                          <button
                            onClick={handleRemoveThumbnail}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                      <Label
                        htmlFor="thumbnail-upload"
                        className="flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-deepBlue hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={16} />
                        <span className="text-sm">
                          {thumbnailFile ? '다른 이미지 선택' : '이미지 변경'}
                        </span>
                      </Label>
                      <Input
                        id="thumbnail-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="hidden"
                      />
                      {thumbnailFile && (
                        <p className="text-xs text-gray-500">
                          선택된 파일: {thumbnailFile.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square rounded-md overflow-hidden">
                      <Image
                        className="object-cover"
                        fill
                        src={displayItem.thumbnailUrl}
                        alt="썸네일"
                      />
                    </div>
                  )}
                </div>

                {/* 상세 이미지 */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">상세 이미지</p>
                  {isEditMode ? (
                    <div className="space-y-2">
                      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100">
                        <Image
                          className="object-cover"
                          fill
                          src={detailImagePreview || displayItem.detailImageUrl}
                          alt="상세 이미지"
                        />
                        {detailImagePreview && (
                          <button
                            onClick={handleRemoveDetailImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                      <Label
                        htmlFor="detail-image-upload"
                        className="flex items-center justify-center gap-2 w-full p-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-deepBlue hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={16} />
                        <span className="text-sm">
                          {detailImageFile ? '다른 이미지 선택' : '이미지 변경'}
                        </span>
                      </Label>
                      <Input
                        id="detail-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleDetailImageChange}
                        className="hidden"
                      />
                      {detailImageFile && (
                        <p className="text-xs text-gray-500">
                          선택된 파일: {detailImageFile.name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full aspect-square rounded-md overflow-hidden">
                      <Image
                        className="object-cover"
                        fill
                        src={displayItem.detailImageUrl}
                        alt="상세 이미지"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 상품 정보 */}
            <div>
              <p className="mb-3 text-lg font-bold">상품 정보</p>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                {isEditMode ? (
                  <>
                    <EditField
                      label="상품명"
                      value={displayItem.name}
                      onChange={(value) => handleInputChange('name', value)}
                      required
                    />
                    <EditField
                      label="카테고리"
                      value={displayItem.categoryName}
                      onChange={(value) =>
                        handleInputChange('categoryName', value)
                      }
                      required
                    />
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">
                        배송 타입 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={displayItem.deliveryType}
                        onValueChange={(value) =>
                          handleInputChange('deliveryType', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FAST">
                            {DELIVERY_TYPE_KR.FAST}
                          </SelectItem>
                          <SelectItem value="NORMAL">
                            {DELIVERY_TYPE_KR.NORMAL}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <EditField
                      label="원산지"
                      value={displayItem.origin}
                      onChange={(value) => handleInputChange('origin', value)}
                      required
                    />
                    <EditField
                      label="포장 타입"
                      value={displayItem.packagingType}
                      onChange={(value) =>
                        handleInputChange('packagingType', value)
                      }
                      required
                    />
                    <EditField
                      label="판매 단위"
                      value={displayItem.salesUnit}
                      onChange={(value) =>
                        handleInputChange('salesUnit', value)
                      }
                      required
                    />
                    <EditField
                      label="중량 (g)"
                      type="number"
                      value={displayItem.weight}
                      onChange={(value) =>
                        handleInputChange('weight', Number(value))
                      }
                      required
                    />
                    <EditField
                      label="가격 (원)"
                      type="number"
                      value={displayItem.price}
                      onChange={(value) =>
                        handleInputChange('price', Number(value))
                      }
                      required
                    />
                    <EditField
                      label="재고 수량"
                      type="number"
                      value={displayItem.stockQuantity}
                      onChange={(value) =>
                        handleInputChange('stockQuantity', Number(value))
                      }
                      required
                    />
                  </>
                ) : (
                  <>
                    <ItemInfoRow label="상품명" value={displayItem.name} primary />
                    <ItemInfoRow
                      label="카테고리"
                      value={displayItem.categoryName}
                    />
                    <ItemInfoRow
                      label="배송 타입"
                      value={DELIVERY_TYPE_KR[displayItem.deliveryType]}
                    />
                    <ItemInfoRow label="원산지" value={displayItem.origin} />
                    <ItemInfoRow
                      label="포장 타입"
                      value={displayItem.packagingType}
                    />
                    <ItemInfoRow
                      label="판매 단위"
                      value={displayItem.salesUnit}
                    />
                    <ItemInfoRow
                      label="중량"
                      value={`${displayItem.weight}g`}
                    />
                    <ItemInfoRow
                      label="가격"
                      value={`${displayItem.price.toLocaleString()}원`}
                      primary
                    />
                    <ItemInfoRow
                      label="재고"
                      value={`${displayItem.stockQuantity}개`}
                    />
                    <ItemInfoRow
                      label="판매 상태"
                      value={ITEM_STATUS_KR[displayItem.itemStatus]}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 상태 변경 확인 다이얼로그 */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>상품 상태 변경 확인</AlertDialogTitle>
            <AlertDialogDescription>
              상품 상태를{' '}
              <span className="font-bold text-black">
                {ITEM_STATUS_KR[item.itemStatus]}
              </span>
              에서{' '}
              <span className="font-bold text-black">
                {selectedStatus && ITEM_STATUS_KR[selectedStatus]}
              </span>
              (으)로 변경하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmStatusChange}
              disabled={isUpdating}
              className="bg-deepBlue hover:bg-deepBlue/90"
            >
              {isUpdating ? '변경 중...' : '변경'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// 상품 정보 행 컴포넌트 (읽기 전용)
type ItemInfoRowProps = {
  label: string
  value: string
  primary?: boolean
}

function ItemInfoRow({ label, value, primary }: ItemInfoRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm ${primary ? 'font-bold' : ''}`}>{value}</span>
    </div>
  )
}

// 편집 필드 컴포넌트
type EditFieldProps = {
  label: string
  value: string | number
  onChange: (value: string) => void
  type?: 'text' | 'number'
  required?: boolean
}

function EditField({
                     label,
                     value,
                     onChange,
                     type = 'text',
                     required = false,
                   }: EditFieldProps) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-gray-600">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}