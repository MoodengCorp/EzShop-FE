// src/mocks/OrderData.ts
// ✅ 새로운 타입 구조에 맞춘 Mock 데이터

import { Order, OrderDetail } from '@/features/orders/types/order'

/**
 * 주문 목록 Mock 데이터
 * ✅ orderNumber가 string으로 변경됨
 */
export const mockOrders: Order[] = [
  {
    orderId: 1,
    orderNumber: '20241118000001', // ✅ string으로 변경
    orderDate: '2024-11-18',
    orderStatus: 'DELIVERED',
    totalPrice: 45900,
    items: [
      {
        itemId: 101,
        name: '제주 한라봉',
        quantity: 2,
        purchasePrice: 15900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 102,
        name: '유기농 시금치',
        quantity: 3,
        purchasePrice: 4500,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/abc123-def456.jpg',
      },
      {
        itemId: 103,
        name: '국내산 계란 30구',
        quantity: 1,
        purchasePrice: 9600,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/egg-product.jpg',
      },
    ],
  },
  {
    orderId: 2,
    orderNumber: '20241117000002', // ✅ string
    orderDate: '2024-11-17',
    orderStatus: 'DELIVERING',
    totalPrice: 32800,
    items: [
      {
        itemId: 201,
        name: '한우 불고기용 300g',
        quantity: 1,
        purchasePrice: 18900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/beef-001.jpg',
      },
      {
        itemId: 202,
        name: '포기김치 2kg',
        quantity: 1,
        purchasePrice: 13900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/kimchi-001.jpg',
      },
    ],
  },
  {
    orderId: 3,
    orderNumber: '20241116000003', // ✅ string
    orderDate: '2024-11-16',
    orderStatus: 'PENDING',
    totalPrice: 28700,
    items: [
      {
        itemId: 301,
        name: '친환경 로메인 상추',
        quantity: 2,
        purchasePrice: 4500,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/lettuce-001.jpg',
      },
      {
        itemId: 302,
        name: '방울토마토 500g',
        quantity: 3,
        purchasePrice: 6900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/tomato-001.jpg',
      },
    ],
  },
  {
    orderId: 4,
    orderNumber: '20241115000004', // ✅ string
    orderDate: '2024-11-15',
    orderStatus: 'DELIVERED',
    totalPrice: 19800,
    items: [
      {
        itemId: 401,
        name: '제주 감귤 2kg',
        quantity: 1,
        purchasePrice: 12900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/orange-001.jpg',
      },
      {
        itemId: 402,
        name: '백김치 1kg',
        quantity: 1,
        purchasePrice: 6900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/white-kimchi.jpg',
      },
    ],
  },
  {
    orderId: 5,
    orderNumber: '20241114000005', // ✅ string
    orderDate: '2024-11-14',
    orderStatus: 'DELIVERED',
    totalPrice: 54300,
    items: [
      {
        itemId: 501,
        name: '샤인머스캣 1kg',
        quantity: 2,
        purchasePrice: 19900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/grape-shine.jpg',
      },
      {
        itemId: 502,
        name: '흑돼지 삼겹살 600g',
        quantity: 1,
        purchasePrice: 14500,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/pork-belly.jpg',
      },
    ],
  },
]

/**
 * 주문 상세 Mock 데이터
 * ✅ user → deliveryInfo로 구조 변경
 */
export const mockOrderDetails: Record<number, OrderDetail> = {
  1: {
    orderId: 1,
    orderNumber: '20241118000001',
    orderDate: '2024-11-18',
    orderStatus: 'DELIVERED',
    totalPrice: 45900,
    items: [
      {
        itemId: 101,
        name: '제주 한라봉',
        quantity: 2,
        purchasePrice: 15900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 102,
        name: '유기농 시금치',
        quantity: 3,
        purchasePrice: 4500,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/abc123-def456.jpg',
      },
      {
        itemId: 103,
        name: '국내산 계란 30구',
        quantity: 1,
        purchasePrice: 9600,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/egg-product.jpg',
      },
    ],
    // ✅ deliveryInfo로 변경 (user → deliveryInfo)
    deliveryInfo: {
      recipientName: '홍길동',
      recipientPhone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123',
      addressDetail: '우리빌딩 5층',
    },
    deliveryRequest: '부재 시 경비실에 맡겨주세요',
  },
  2: {
    orderId: 2,
    orderNumber: '20241117000002',
    orderDate: '2024-11-17',
    orderStatus: 'DELIVERING',
    totalPrice: 32800,
    items: [
      {
        itemId: 201,
        name: '한우 불고기용 300g',
        quantity: 1,
        purchasePrice: 18900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/beef-001.jpg',
      },
      {
        itemId: 202,
        name: '포기김치 2kg',
        quantity: 1,
        purchasePrice: 13900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/kimchi-001.jpg',
      },
    ],
    deliveryInfo: {
      recipientName: '김철수',
      recipientPhone: '010-9876-5432',
      address: '서울특별시 서초구 반포대로 456',
      addressDetail: '101동 505호',
    },
    deliveryRequest: '문 앞에 놓아주세요',
  },
  3: {
    orderId: 3,
    orderNumber: '20241116000003',
    orderDate: '2024-11-16',
    orderStatus: 'PENDING',
    totalPrice: 28700,
    items: [
      {
        itemId: 301,
        name: '친환경 로메인 상추',
        quantity: 2,
        purchasePrice: 4500,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/lettuce-001.jpg',
      },
      {
        itemId: 302,
        name: '방울토마토 500g',
        quantity: 3,
        purchasePrice: 6900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/tomato-001.jpg',
      },
    ],
    deliveryInfo: {
      recipientName: '이영희',
      recipientPhone: '010-5555-6666',
      address: '경기도 성남시 분당구 판교역로 789',
      addressDetail: '판교테크원타워 1201호',
    },
    deliveryRequest: '배송 전 연락주세요',
  },
  4: {
    orderId: 4,
    orderNumber: '20241115000004',
    orderDate: '2024-11-15',
    orderStatus: 'DELIVERED',
    totalPrice: 19800,
    items: [
      {
        itemId: 401,
        name: '제주 감귤 2kg',
        quantity: 1,
        purchasePrice: 12900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/orange-001.jpg',
      },
      {
        itemId: 402,
        name: '백김치 1kg',
        quantity: 1,
        purchasePrice: 6900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/white-kimchi.jpg',
      },
    ],
    deliveryInfo: {
      recipientName: '박민수',
      recipientPhone: '010-7777-8888',
      address: '인천광역시 연수구 송도과학로 100',
      addressDetail: '101동 202호',
    },
    // addressDetail 없는 경우
    deliveryRequest: '빠른 배송 부탁드립니다',
  },
  5: {
    orderId: 5,
    orderNumber: '20241114000005',
    orderDate: '2024-11-14',
    orderStatus: 'DELIVERED',
    totalPrice: 54300,
    items: [
      {
        itemId: 501,
        name: '샤인머스캣 1kg',
        quantity: 2,
        purchasePrice: 19900,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/grape-shine.jpg',
      },
      {
        itemId: 502,
        name: '흑돼지 삼겹살 600g',
        quantity: 1,
        purchasePrice: 14500,
        thumbnailUrl: 'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/pork-belly.jpg',
      },
    ],
    deliveryInfo: {
      recipientName: '정수진',
      recipientPhone: '010-3333-4444',
      address: '부산광역시 해운대구 센텀중앙로 79',
      addressDetail: '센텀시티타워 2503호',
    },
    deliveryRequest: "ㅁㅇㅁㄴㅇ",
  },
}

/**
 * 편의 함수: orderId로 주문 상세 조회
 */
export function getOrderDetailById(orderId: number): OrderDetail | undefined {
  return mockOrderDetails[orderId]
}

/**
 * 편의 함수: orderNumber로 주문 조회
 */
export function getOrderByNumber(orderNumber: string): Order | undefined {
  return mockOrders.find(order => order.orderNumber === orderNumber)
}

/**
 * 편의 함수: 상태별 주문 필터링
 */
export function getOrdersByStatus(status: Order['orderStatus']): Order[] {
  return mockOrders.filter(order => order.orderStatus === status)
}

/**
 * 편의 함수: 기간별 주문 필터링
 */
export function getOrdersByDateRange(startDate: string, endDate: string): Order[] {
  return mockOrders.filter(order => {
    return order.orderDate >= startDate && order.orderDate <= endDate
  })
}