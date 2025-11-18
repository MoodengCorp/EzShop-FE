import { Order, OrderDetail } from '@/features/orders/types/order';

// 주문 목록 목 데이터
export const mockOrders: Order[] = [
  {
    orderId: 25,
    orderNumber: 20240115001,
    orderDate: '2024-01-15',
    orderStatus: 'DELIVERED',
    totalPrice: 25900,
    items: [
      {
        itemId: 98,
        name: '유기농 시금치',
        quantity: 2,
        purchasePrice: 4500,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 140,
        name: '한우 불고기용',
        quantity: 1,
        purchasePrice: 18900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 24,
    orderNumber: 20240112001,
    orderDate: '2024-01-12',
    orderStatus: 'DELIVERING',
    totalPrice: 15400,
    items: [
      {
        itemId: 210,
        name: '포기김치',
        quantity: 1,
        purchasePrice: 12900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 211,
        name: '백김치',
        quantity: 1,
        purchasePrice: 2500,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 23,
    orderNumber: 20240110001,
    orderDate: '2024-01-10',
    orderStatus: 'PENDING',
    totalPrice: 8700,
    items: [
      {
        itemId: 300,
        name: '친환경 상추',
        quantity: 1,
        purchasePrice: 4500,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 301,
        name: '방울토마토',
        quantity: 2,
        purchasePrice: 4200,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 22,
    orderNumber: 20231220001,
    orderDate: '2023-12-20',
    orderStatus: 'DELIVERED',
    totalPrice: 45600,
    items: [
      {
        itemId: 150,
        name: '[김구원선생] 국산 두부로 만든 우동 (2인분)',
        quantity: 3,
        purchasePrice: 9810,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 151,
        name: '제주 은갈치',
        quantity: 1,
        purchasePrice: 16170,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 21,
    orderNumber: 20231215001,
    orderDate: '2023-12-15',
    orderStatus: 'CANCELLED',
    totalPrice: 12000,
    items: [
      {
        itemId: 400,
        name: '우유 2L',
        quantity: 2,
        purchasePrice: 6000,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 20,
    orderNumber: 20231210001,
    orderDate: '2023-12-10',
    orderStatus: 'DELIVERED',
    totalPrice: 28900,
    items: [
      {
        itemId: 500,
        name: '한우 등심',
        quantity: 1,
        purchasePrice: 28900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 19,
    orderNumber: 20231201001,
    orderDate: '2023-12-01',
    orderStatus: 'DELIVERED',
    totalPrice: 15600,
    items: [
      {
        itemId: 600,
        name: '제주 감귤',
        quantity: 2,
        purchasePrice: 7800,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 18,
    orderNumber: 20231125001,
    orderDate: '2023-11-25',
    orderStatus: 'DELIVERED',
    totalPrice: 32400,
    items: [
      {
        itemId: 700,
        name: '닭가슴살',
        quantity: 5,
        purchasePrice: 6480,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 17,
    orderNumber: 20230920001,
    orderDate: '2023-09-20',
    orderStatus: 'DELIVERED',
    totalPrice: 19800,
    items: [
      {
        itemId: 800,
        name: '유기농 계란 30구',
        quantity: 1,
        purchasePrice: 11900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 801,
        name: '식빵',
        quantity: 1,
        purchasePrice: 7900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
  {
    orderId: 16,
    orderNumber: 20230815001,
    orderDate: '2023-08-15',
    orderStatus: 'DELIVERED',
    totalPrice: 42000,
    items: [
      {
        itemId: 900,
        name: '샤인머스캣',
        quantity: 1,
        purchasePrice: 42000,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
  },
];

// 주문 상세 목 데이터
export const mockOrderDetails: Record<number, OrderDetail> = {
  25: {
    orderId: 25,
    orderNumber: 20240115001,
    orderDate: '2024-01-15',
    orderStatus: 'DELIVERED',
    totalPrice: 25900,
    items: [
      {
        itemId: 98,
        name: '유기농 시금치',
        quantity: 2,
        purchasePrice: 4500,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 140,
        name: '한우 불고기용',
        quantity: 1,
        purchasePrice: 18900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
    user: {
      name: '홍길동',
      phone: '010-1234-5678',
      address: '서울특별시 강남구 테헤란로 123',
      addressDetail: '456동 789호',
    },
    deliveryRequest: '문 앞에 놓아주세요',
  },
  24: {
    orderId: 24,
    orderNumber: 20240112001,
    orderDate: '2024-01-12',
    orderStatus: 'DELIVERING',
    totalPrice: 15400,
    items: [
      {
        itemId: 210,
        name: '포기김치',
        quantity: 1,
        purchasePrice: 12900,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 211,
        name: '백김치',
        quantity: 1,
        purchasePrice: 2500,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
    user: {
      name: '김철수',
      phone: '010-9876-5432',
      address: '서울특별시 송파구 올림픽로 300',
      addressDetail: '101동 202호',
    },
    deliveryRequest: '경비실에 맡겨주세요',
  },
  23: {
    orderId: 23,
    orderNumber: 20240110001,
    orderDate: '2024-01-10',
    orderStatus: 'PENDING',
    totalPrice: 8700,
    items: [
      {
        itemId: 300,
        name: '친환경 상추',
        quantity: 1,
        purchasePrice: 4500,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 301,
        name: '방울토마토',
        quantity: 2,
        purchasePrice: 4200,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
    user: {
      name: '이영희',
      phone: '010-5555-6666',
      address: '경기도 성남시 분당구 정자로 100',
      addressDetail: '203동 304호',
    },
  },
  22: {
    orderId: 22,
    orderNumber: 20231220001,
    orderDate: '2023-12-20',
    orderStatus: 'DELIVERED',
    totalPrice: 45600,
    items: [
      {
        itemId: 150,
        name: '[김구원선생] 국산 두부로 만든 우동 (2인분)',
        quantity: 3,
        purchasePrice: 9810,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
      {
        itemId: 151,
        name: '제주 은갈치',
        quantity: 1,
        purchasePrice: 16170,
        thumbnailUrl:
          'https://product-image.kurly.com/hdims/resize/%5E%3E120x%3E156/cropcenter/120x156/quality/85/src/product/image/5a6670aa-3bcf-44c7-b72c-ece229af3ccc.jpg',
      },
    ],
    user: {
      name: '박민수',
      phone: '010-7777-8888',
      address: '인천광역시 연수구 송도과학로 123',
      addressDetail: '401동 501호',
    },
    deliveryRequest: '부재 시 전화주세요',
  },
};