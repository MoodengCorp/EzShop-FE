import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export interface RegisterItemFormValues {
  name: string
  price: string
  categoryName: string
  stockQuantity: string
  origin: string
  deliveryType: string
  packagingType: string
  salesUnit: string
  weight: string
  description: string
}

interface RegisterItemConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: RegisterItemFormValues
  mainImage: File | null
  detailImage: File | null
  isSubmitting: boolean
  onConfirm: () => void | Promise<void>
  deliveryTypeLabel?: string
}

export default function RegisterItemConfirmDialog({
  open,
  onOpenChange,
  formData,
  mainImage,
  detailImage,
  isSubmitting,
  onConfirm,
  deliveryTypeLabel,
}: RegisterItemConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 정보를 확인해주세요</DialogTitle>
          <DialogDescription>
            아래 내용으로 상품을 등록하시겠어요? 확인 후 등록을 진행합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-lg border bg-gray-50 p-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>상품명</span>
            <span className="font-semibold text-foreground">
              {formData.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>가격</span>
            <span className="font-semibold text-foreground">
              {Number(formData.price || 0).toLocaleString()}원
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center justify-between">
              <span>카테고리</span>
              <span className="font-semibold text-foreground">
                {formData.categoryName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>재고 수량</span>
              <span className="font-semibold text-foreground">
                {formData.stockQuantity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>배송 타입</span>
              <span className="font-semibold text-foreground">
                {deliveryTypeLabel || formData.deliveryType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>포장 방식</span>
              <span className="font-semibold text-foreground">
                {formData.packagingType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>판매 단위</span>
              <span className="font-semibold text-foreground">
                {formData.salesUnit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>중량</span>
              <span className="font-semibold text-foreground">
                {formData.weight}g
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>원산지</span>
              <span className="font-semibold text-foreground">
                {formData.origin}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">대표 이미지</p>
            <p className="font-semibold text-foreground">
              {mainImage ? mainImage.name : '선택되지 않음'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">상세 이미지</p>
            <p className="font-semibold text-foreground">
              {detailImage ? detailImage.name : '선택되지 않음'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">상품 설명</p>
            <p className="font-semibold text-foreground">
              {formData.description}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '확인 후 등록'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
