// src/lib/api/orders.ts
import { apiClient } from '@/lib/apiClient'
import {
  Order,
  OrderDetailResponse,
  OrderListResponse,
  OrderPeriod,
} from '@/types/order'
import { ApiResponse } from '@/types/api'

// 주문 목록 조회 (period만 받아서 전체 데이터 반환)
export async function fetchOrders(period: OrderPeriod) {
  try {
    const endpoint = `/orders?period=${encodeURIComponent(period)}`;

    const response = await apiClient.get<OrderListResponse>(endpoint);

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error || {
          code: 'UNKNOWN_ERROR',
          message: '주문 목록을 불러오는데 실패했습니다.',
        },
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.statusCode?.toString() || 'NETWORK_ERROR',
        message: error.message || '주문 목록을 불러오는데 실패했습니다.',
      },
    };
  }
}

// 주문 상세 조회
export async function fetchOrderDetail(orderId: string) {
  try {
    const response = await apiClient.get<OrderDetailResponse>(
      `/orders/${orderId}`
    );

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error || {
          code: 'UNKNOWN_ERROR',
          message: '주문 상세 정보를 불러오는데 실패했습니다.',
        },
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.statusCode?.toString() || 'NETWORK_ERROR',
        message: error.message || '주문 상세 정보를 불러오는데 실패했습니다.',
      },
    };
  }
}

// 주문 생성
export async function createOrder(orderData: {
  cartItemIds: number[];
  deliveryRequest?: string;
}) {
  try {
    const response = await apiClient.post<ApiResponse<Order>>(
      '/orders',
      orderData
    );

    if (response.success && response.data) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error || {
          code: 'UNKNOWN_ERROR',
          message: '주문 생성에 실패했습니다.',
        },
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.statusCode?.toString() || 'NETWORK_ERROR',
        message: error.message || '주문 생성에 실패했습니다.',
      },
    };
  }
}