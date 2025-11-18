
// 아이템
export interface Item {
  itemId: number
  name: string
  price: number
  thumbnailUrl: string
}

// 아이템 상제 조회 응답
export interface ItemDetailResponse {
  itemId: number;
  name: string;
  price: number;
  stockQuantity: number;
  thumbnailUrl: string;
  detailImageUrl: string;
  origin: string;
  deliveryType: string;
  packagingType: string;
  salesUnit: string;
  weight: number;
}
