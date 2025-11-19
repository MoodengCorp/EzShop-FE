// src/mocks/sellerOrders.ts
import { OrderDetail } from '@/features/orders/types/order'
import { SellerOrderSearchResponse, OrderStatusCounts } from '@/features/seller/manage_orders/types/seller-order.types'


/**
 * 판매자 주문 목록 목 데이터
 */
export const MOCK_SELLER_ORDERS: OrderDetail[] = [
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
    deliveryInfo: {
      recipientName: '김철수',
      recipientPhone: '010-1234-5678',
      address: '서울시 강남구 테헤란로 123',
      addressDetail: '456호',
    },
    deliveryRequest: '부재 시 문 앞에 놓아주세요',
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
    deliveryInfo: {
      recipientName: '이영희',
      recipientPhone: '010-2345-6789',
      address: '서울시 송파구 올림픽로 234',
      addressDetail: '101동 1502호',
    },
    deliveryRequest: '경비실에 맡겨주세요',
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
    deliveryInfo: {
      recipientName: '박민수',
      recipientPhone: '010-3456-7890',
      address: '경기도 성남시 분당구 판교로 345',
      addressDetail: '202호',
    },
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
    deliveryInfo: {
      recipientName: '최지은',
      recipientPhone: '010-4567-8901',
      address: '서울시 마포구 월드컵북로 456',
      addressDetail: '3층',
    },
    deliveryRequest: '직접 받겠습니다',
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
    deliveryInfo: {
      recipientName: '정수연',
      recipientPhone: '010-5678-9012',
      address: '인천시 연수구 송도과학로 567',
      addressDetail: '1204호',
    },
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
    deliveryInfo: {
      recipientName: '강태희',
      recipientPhone: '010-6789-0123',
      address: '부산시 해운대구 해운대로 678',
      addressDetail: '201동 803호',
    },
    deliveryRequest: '배송 전 연락 부탁드립니다',
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
    deliveryInfo: {
      recipientName: '윤서준',
      recipientPhone: '010-7890-1234',
      address: '대전시 유성구 대학로 789',
      addressDetail: '빌라 2층',
    },
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
    deliveryInfo: {
      recipientName: '한지민',
      recipientPhone: '010-8901-2345',
      address: '광주시 북구 첨단과기로 890',
      addressDetail: '105동 602호',
    },
    deliveryRequest: '새벽 배송 부탁드립니다',
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
    deliveryInfo: {
      recipientName: '임하늘',
      recipientPhone: '010-9012-3456',
      address: '울산시 남구 삼산로 901',
      addressDetail: '103호',
    },
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
    deliveryInfo: {
      recipientName: '송민호',
      recipientPhone: '010-0123-4567',
      address: '제주시 첨단로 1012',
      addressDetail: '단독주택',
    },
    deliveryRequest: '조심히 다뤄주세요',
  },
  {
    orderId: 11,
    orderNumber: 'ORD-2024-011',
    orderDate: '2024-11-15',
    orderStatus: 'CANCEL',
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
    deliveryInfo: {
      recipientName: '오세훈',
      recipientPhone: '010-1122-3344',
      address: '세종시 한누리대로 1113',
      addressDetail: '304호',
    },
    deliveryRequest: '고객 변심으로 취소',
  },
]

/**
 * 주문 상태별 카운트 목 데이터
 */
export const MOCK_ORDER_STATUS_COUNTS: OrderStatusCounts = {
  PENDING: 4,
  DELIVERING: 3,
  DELIVERED: 3,
  CANCEL: 1
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