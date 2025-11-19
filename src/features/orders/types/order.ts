// src/features/orders/types/order.ts

/**
 * 주문 상태
 * ✅ 백엔드 OrderStatus enum과 일치
 */
export type OrderStatus = 'PENDING' | 'DELIVERING' | 'DELIVERED | CANCEL'

/**
 * 주문 기간 필터 (프론트엔드 전용)
 */
export type OrderPeriod = '3개월' | '6개월' | '1년'

/**
 * 주문 아이템 (상품)
 * ✅ 백엔드 OrderItemResponseDto와 완전히 일치
 */
export interface OrderItem {
  itemId: number
  name: string
  quantity: number
  purchasePrice: number
  thumbnailUrl: string
}

/**
 * 주문 기본 정보 (목록용)
 * ✅ 백엔드 OrderSimpleResponseDto와 완전히 일치
 */
export interface Order {
  orderId: number
  orderNumber: string  // ✅ number에서 string으로 수정
  orderDate: string    // yyyy-MM-dd 형식
  orderStatus: OrderStatus
  totalPrice: number
  items: OrderItem[]
}

/**
 * 배송 정보
 * ✅ 백엔드 OrderDetailResponseDto.DeliveryInfoDto와 일치
 */
export interface DeliveryInfo {
  recipientName: string
  recipientPhone: string
  address: string
  addressDetail: string
}

/**
 * 주문 상세 정보
 * ✅ 백엔드 OrderDetailResponseDto와 완전히 일치
 */
export interface OrderDetail extends Order {
  deliveryInfo: DeliveryInfo  // ✅ 구조 변경 (user -> deliveryInfo)
  deliveryRequest?: string
}

/**
 * 주문 생성 폼 데이터 (프론트엔드)
 */
export interface OrderCreateFormData {
  cartItemIds: number[]
  recipientName: string
  recipientPhone: string
  address: string
  addressDetail: string
  deliveryRequest?: string
}

/**
 * 주문 생성 API 요청 (백엔드로 전송)
 * ✅ 백엔드 OrderCreateRequestDto와 완전히 일치
 */
export interface OrderCreateRequest {
  cartItemIds: number[]
  recipientName: string
  recipientPhone: string
  address: string
  addressDetail: string
  deliveryRequest?: string
}
