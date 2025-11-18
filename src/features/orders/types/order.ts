// src/types/order.ts
/**
 * 주문 관련 타입 정의
 */

/**
 * 주문 상태
 */
export type OrderStatus = 'PENDING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'

/**
 * 주문 기간 필터
 */
export type OrderPeriod = '3개월' | '6개월' | '1년'

/**
 * 주문 아이템 (상품)
 */
export interface OrderItem {
  itemId: number
  name: string
  quantity: number
  purchasePrice: number
  thumbnailUrl: string
}

/**
 * 주문 기본 정보
 */
export interface Order {
  orderId: number
  orderNumber: number
  orderDate: string
  orderStatus: OrderStatus
  totalPrice: number
  items: OrderItem[]
}

export interface DeliveryAddress {
  name: string
  phone: string
  address: string
  addressDetail?: string
}

/**
 * 주문 상세 정보 (배송지 포함)
 */
export interface OrderDetail extends Order {
  user: DeliveryAddress  // 재사용!
  deliveryRequest?: string
}

/**
 * 주문 생성 요청
 */
export interface CreateOrderRequest {
  cartItemIds: number[]
  deliveryRequest?: string
}