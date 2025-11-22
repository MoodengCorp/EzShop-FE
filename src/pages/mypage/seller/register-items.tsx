import { useState } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/use-toast'
import { ProtectedRoute } from '@/guards/ProtectedRoute'
import MyPageLayout from '@/components/layout/MyPageLayout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Image as ImageIcon,
  UploadCloud,
  FileText,
  Package,
} from 'lucide-react'
import { useCreateSellerItem } from '@/features/seller/register_items/hooks/useCreateSellerItem'
import { buildRegisterItemPayload } from '@/features/seller/register_items/api/registerItemApi'
import { useCategories } from '@/features/category/hooks/useCategories'
import RegisterItemConfirmDialog from '@/features/seller/register_items/components/RegisterItemConfirmDialog'
import { toast } from 'sonner'

const DELIVERY_TYPES = [
  { value: 'FAST', label: '빠른 배송' },
  { value: 'NORMAL', label: '일반 배송' },
]

const PACKAGING_TYPES = ['스티로폼 박스', '비닐 포장', '종이 박스']

const SALES_UNITS = ['1개', '1팩', '1상자']

export default function RegisterItem() {
  const createItem = useCreateSellerItem()
  const router = useRouter()
  const isSubmitting = createItem.isPending
  const {data: categories} = useCategories();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categoryName: '',
    stockQuantity: '',
    origin: '',
    deliveryType: '',
    packagingType: '',
    salesUnit: '',
    weight: '',
    description: '',
  })
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [detailImage, setDetailImage] = useState<File | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    setMainImage(file ?? null)
  }

  const handleDetailImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    setDetailImage(file ?? null)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setConfirmOpen(true)
  }

  const handleConfirmSubmit = async () => {
    const dto = {
      name: formData.name,
      price: Number(formData.price) || 0,
      categoryName: formData.categoryName,
      stockQuantity: Number(formData.stockQuantity) || 0,
      origin: formData.origin,
      deliveryType: formData.deliveryType as 'FAST' | 'NORMAL',
      packagingType: formData.packagingType,
      salesUnit: formData.salesUnit,
      weight: Number(formData.weight) || 0,
    }

    const payload = buildRegisterItemPayload({
      dto,
      thumbnailFile: mainImage || undefined,
      detailImageFile: detailImage || undefined,
    })

    try {
      const response = await createItem.mutateAsync({ payload })
      const success = response?.success !== false

      if (success) {
        setConfirmOpen(false)
        toast('상품 등록 완료', {
          position: 'top-center'
        })
        await router.push('/mypage/seller/manage-items')
        return
      }
    } catch (error) {
      toast('상품 등록 실패', {
        position: 'top-center'
      })
    } finally {
      setConfirmOpen(false)
    }
  }

  const deliveryTypeLabel = DELIVERY_TYPES.find(
    (option) => option.value === formData.deliveryType,
  )?.label

  return (
    <ProtectedRoute>
      <MyPageLayout>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-6 shadow-sm"
        >
          <div>
            <h2 className="text-2xl font-semibold">상품 등록</h2>
            <p className="text-sm text-muted-foreground">
              새로운 상품 정보를 등록해주세요
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-[2fr,1fr] gap-6">
            <div className="space-y-6">
              <section className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Package className="h-5 w-5" />
                  <span>상품 기본 정보</span>
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">상품명</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="상품명을 입력해주세요"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoryName">카테고리</Label>
                    <Select
                      value={formData.categoryName}
                      onValueChange={(value) =>
                        handleSelectChange('categoryName', value)
                      }
                    >
                      <SelectTrigger id="categoryName">
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories && categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">가격</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="판매 가격을 입력해주세요"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">재고 수량</Label>
                    <Input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      placeholder="재고 수량을 입력해주세요"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origin">원산지</Label>
                    <Input
                      id="origin"
                      name="origin"
                      placeholder="원산지를 입력해주세요"
                      value={formData.origin}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryType">배송 타입</Label>
                    <Select
                      value={formData.deliveryType}
                      onValueChange={(value) =>
                        handleSelectChange('deliveryType', value)
                      }
                    >
                      <SelectTrigger id="deliveryType">
                        <SelectValue placeholder="배송 타입을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {DELIVERY_TYPES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="packagingType">포장 방식</Label>
                    <Select
                      value={formData.packagingType}
                      onValueChange={(value) =>
                        handleSelectChange('packagingType', value)
                      }
                    >
                      <SelectTrigger id="packagingType">
                        <SelectValue placeholder="포장 방식을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {PACKAGING_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salesUnit">판매 단위</Label>
                    <Select
                      value={formData.salesUnit}
                      onValueChange={(value) =>
                        handleSelectChange('salesUnit', value)
                      }
                    >
                      <SelectTrigger id="salesUnit">
                        <SelectValue placeholder="판매 단위를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {SALES_UNITS.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">중량(그램)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="중량을 입력해주세요"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="grid gap-4 grid-cols-2">
                <Card className="h-full border-dashed">
                  <CardContent className="flex h-full flex-col items-center justify-center gap-3 text-center py-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold">
                        대표 이미지 업로드
                      </p>
                      <p className="text-xs text-muted-foreground">
                        .JPG, .PNG 파일을 업로드하세요
                      </p>
                    </div>
                    <Label
                      htmlFor="mainImage"
                      className="cursor-pointer rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      이미지 선택하기
                    </Label>
                    <input
                      id="mainImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMainImageChange}
                    />
                    {mainImage && (
                      <p className="text-xs text-muted-foreground">
                        선택된 파일: {mainImage.name}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="h-full border-dashed">
                  <CardContent className="flex h-full flex-col items-center justify-center gap-3 text-center py-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <ImageIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold">
                        상세 이미지 업로드
                      </p>
                      <p className="text-xs text-muted-foreground">
                        상품 설명용 이미지를 1개 업로드하세요
                      </p>
                    </div>
                    <Label
                      htmlFor="detailImage"
                      className="cursor-pointer rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      이미지 선택하기
                    </Label>
                    <input
                      id="detailImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleDetailImageChange}
                    />
                    {detailImage && (
                      <p className="text-xs text-muted-foreground">
                        선택된 파일: {detailImage.name}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5" />
                  <span>상품 설명</span>
                </div>
                <Textarea
                  name="description"
                  placeholder="상품 설명과 핵심 정보를 입력해주세요"
                  className="min-h-[150px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </section>
            </div>

            <Card className="h-fit border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  상품 정보 미리보기
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">상품명</p>
                  <p className="text-base font-semibold text-foreground">
                    {formData.name || '상품명 미입력'}
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-xs text-muted-foreground">가격</span>
                  <span className="text-lg font-semibold text-primary">
                    {formData.price
                      ? Number(formData.price).toLocaleString() + '원'
                      : '가격 미입력'}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">배송 타입</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.deliveryType
                      ? DELIVERY_TYPES.find(
                          (option) => option.value === formData.deliveryType,
                        )?.label
                      : '선택되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">카테고리</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.categoryName || '선택되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">재고 수량</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.stockQuantity || '입력되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">원산지</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.origin || '입력되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">포장 방식</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.packagingType || '입력되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">판매 단위</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.salesUnit || '입력되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">중량</p>
                  <p className="text-base font-medium text-foreground">
                    {formData.weight ? `${formData.weight} g` : '입력되지 않음'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">상품 설명</p>
                  <p className="text-base text-foreground">
                    {formData.description || '상품 설명을 입력해주세요'}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">등록된 이미지</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {mainImage ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                        대표: {mainImage.name}
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-muted-foreground">
                        대표 이미지 미등록
                      </span>
                    )}
                    {detailImage ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                        상세: {detailImage.name}
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-muted-foreground">
                        상세 이미지 미등록
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '상품 등록'}
            </Button>
          </div>
        </form>
        <RegisterItemConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          formData={formData}
          mainImage={mainImage}
          detailImage={detailImage}
          isSubmitting={isSubmitting}
          onConfirm={handleConfirmSubmit}
          deliveryTypeLabel={deliveryTypeLabel}
        />
      </MyPageLayout>
    </ProtectedRoute>
  )
}
