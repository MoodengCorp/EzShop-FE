// src/mocks/sellerOrders.ts
import { Order } from '@/features/orders/types/order'
import { SellerOrderSearchResponse, OrderStatusCounts } from '@/features/seller/manage_orders/types/seller-order.types'

/**
 * 판매자 주문 목록 목 데이터
 */
export const MOCK_SELLER_ORDERS: Order[] = [
  {
    orderId: 1,
    orderNumber: 'ORD-2024-001',
    orderDate: '2024-11-15',
    orderStatus: 'PENDING',
    totalPrice: 45000,
    items: [
      {
        itemId: 101,
        name: '유기농 방울토마토',
        quantity: 2,
        purchasePrice: 15000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 102,
        name: '제주 감귤',
        quantity: 1,
        purchasePrice: 15000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 2,
    orderNumber: 'ORD-2024-002',
    orderDate: '2024-11-16',
    orderStatus: 'DELIVERING',
    totalPrice: 32000,
    items: [
      {
        itemId: 103,
        name: '국내산 딸기',
        quantity: 1,
        purchasePrice: 32000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 3,
    orderNumber: 'ORD-2024-003',
    orderDate: '2024-11-17',
    orderStatus: 'DELIVERED',
    totalPrice: 28000,
    items: [
      {
        itemId: 104,
        name: '청양고추',
        quantity: 3,
        purchasePrice: 8000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 105,
        name: '대파',
        quantity: 2,
        purchasePrice: 2000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 4,
    orderNumber: 'ORD-2024-004',
    orderDate: '2024-11-18',
    orderStatus: 'PENDING',
    totalPrice: 65000,
    items: [
      {
        itemId: 106,
        name: '한우 등심',
        quantity: 1,
        purchasePrice: 65000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 5,
    orderNumber: 'ORD-2024-005',
    orderDate: '2024-11-18',
    orderStatus: 'DELIVERING',
    totalPrice: 18000,
    items: [
      {
        itemId: 107,
        name: '상추',
        quantity: 2,
        purchasePrice: 5000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 108,
        name: '깻잎',
        quantity: 2,
        purchasePrice: 4000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 6,
    orderNumber: 'ORD-2024-006',
    orderDate: '2024-11-19',
    orderStatus: 'PENDING',
    totalPrice: 42000,
    items: [
      {
        itemId: 109,
        name: '사과',
        quantity: 3,
        purchasePrice: 12000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 110,
        name: '배',
        quantity: 2,
        purchasePrice: 9000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 7,
    orderNumber: 'ORD-2024-007',
    orderDate: '2024-11-19',
    orderStatus: 'DELIVERED',
    totalPrice: 55000,
    items: [
      {
        itemId: 111,
        name: '삼겹살',
        quantity: 1,
        purchasePrice: 55000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 8,
    orderNumber: 'ORD-2024-008',
    orderDate: '2024-11-19',
    orderStatus: 'DELIVERING',
    totalPrice: 24000,
    items: [
      {
        itemId: 112,
        name: '양파',
        quantity: 4,
        purchasePrice: 3000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 113,
        name: '마늘',
        quantity: 3,
        purchasePrice: 4000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 9,
    orderNumber: 'ORD-2024-009',
    orderDate: '2024-11-19',
    orderStatus: 'PENDING',
    totalPrice: 38000,
    items: [
      {
        itemId: 114,
        name: '브로콜리',
        quantity: 2,
        purchasePrice: 8000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 115,
        name: '파프리카',
        quantity: 3,
        purchasePrice: 7000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 116,
        name: '양배추',
        quantity: 1,
        purchasePrice: 5000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 10,
    orderNumber: 'ORD-2024-010',
    orderDate: '2024-11-19',
    orderStatus: 'DELIVERED',
    totalPrice: 72000,
    items: [
      {
        itemId: 117,
        name: '갈비',
        quantity: 1,
        purchasePrice: 72000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
  {
    orderId: 11,
    orderNumber: 'ORD-2024-011',
    orderDate: '2024-11-15',
    orderStatus: 'PENDING',
    totalPrice: 45000,
    items: [
      {
        itemId: 101,
        name: '유기농 방울토마토',
        quantity: 2,
        purchasePrice: 15000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
      {
        itemId: 102,
        name: '제주 감귤',
        quantity: 1,
        purchasePrice: 15000,
        thumbnailUrl: 'https://via.placeholder.com/100',
      },
    ],
  },
]

/**
 * 주문 상태별 카운트 목 데이터
 */
export const MOCK_ORDER_STATUS_COUNTS: OrderStatusCounts = {
  PENDING: 4,
  DELIVERING: 3,
  DELIVERED: 3,
}

/**
 * 페이지네이션된 응답 생성 함수
 */
export function getMockSellerOrdersResponse(
  page: number = 1,
  perPage: number = 10
): SellerOrderSearchResponse {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedOrders = MOCK_SELLER_ORDERS.slice(startIndex, endIndex)

  return {
    orders: paginatedOrders,
    pagination: {
      page,
      perPage,
      totalPage: Math.ceil(MOCK_SELLER_ORDERS.length / perPage),
      totalCount: MOCK_SELLER_ORDERS.length,
      hasNext: endIndex < MOCK_SELLER_ORDERS.length,
      hasPrev: page > 1,
    },
  }
}