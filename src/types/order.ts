// src/types/order.ts

// 주문 상태
import { ApiResponse } from '@/types/api'

export type OrderStatus = 'PENDING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED';

// 주문 기간
export type OrderPeriod = '3개월' | '6개월' | '1년';

// 주문 아이템
export interface OrderItem {
  itemId: number;
  name: string;
  quantity: number;
  purchasePrice: number;
  thumbnailUrl: string;
}

// 주문
export interface Order {
  orderId: number;
  orderNumber: number;
  orderDate: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  items: OrderItem[];
}

// 주문 상세 (확장)
export interface OrderDetail extends Order {
  user: {
    name: string;
    phone: string;
    address: string;
    addressDetail?: string;
  };
  deliveryRequest?: string;
}

// 주문 목록 응답 (모든 데이터를 한 번에 받음)
export type OrderListResponse = ApiResponse<Order[]>;

// 주문 상세 응답
export type OrderDetailResponse = ApiResponse<OrderDetail>;