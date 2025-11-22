import { DeliveryType } from '@/features/item/types/item'

export interface SellerItemCreateDto {
  name: string
  price: number
  categoryName: string
  stockQuantity: number
  origin: string
  deliveryType: DeliveryType
  packagingType: string
  salesUnit: string
  weight: number
}

export interface SellerItemCreateRequest {
  dto: SellerItemCreateDto
  thumbnailFile?: File
  detailImageFile?: File
}