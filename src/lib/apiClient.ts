// src/lib/apiClient.ts
import { ApiError, ErrorResponse, RefreshResponse } from '@/types/auth';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/authStore';

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: ApiError) => void;
}> = [];

const processQueue = (error: ApiError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  private async refreshAccessToken(): Promise<string> {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = (async () => {
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) {
        throw new ApiError('리프레시 토큰이 없습니다.', 401);
      }
      try {
        const response = await fetch(`${this.baseURL}/user/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: this.defaultHeaders,
        });
        if (!response.ok) {
          const errorData: ErrorResponse = await response.json().catch(() => ({
            statusCode: response.status,
            message: '토큰 갱신에 실패했습니다.',
          }));
          throw new ApiError(errorData.message, response.status, errorData);
        }
        const data: RefreshResponse = await response.json();
        useAuthStore.getState().setAccessToken(data.accessToken);
        return data.accessToken;
      } catch (error) {
        useAuthStore.getState().logout();
        throw error;
      }
    })();
    try {
      const token = await refreshPromise;
      return token;
    } finally {
      refreshPromise = null;
    }
  }

  // 메인 request 메서드
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, headers = {}, ...restConfig } = config;

    // 헤더를 일반 객체로 구성
    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...(headers as Record<string, string>),
    };

    if (requiresAuth) {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }
    }

    const requestConfig: RequestInit = {
      ...restConfig,
      headers: requestHeaders,
      credentials: 'include'
    };

    try {
      let response = await fetch(`${this.baseURL}${endpoint}`, requestConfig);

      // 401 에러 처리 (토큰 만료)
      if (response.status === 401 && requiresAuth) {
        if (isRefreshing) {
          // 이미 토큰 갱신 중이면 대기열에 추가
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          // 새 토큰으로 재시도
          requestHeaders.Authorization = `Bearer ${token}`;
          response = await fetch(`${this.baseURL}${endpoint}`, {
            ...requestConfig,
            headers: requestHeaders,
            credentials: 'include'
          });
        } else {
          // 토큰 갱신 시작
          isRefreshing = true;
          try {
            const newToken = await this.refreshAccessToken();
            // 대기 중인 요청들 처리
            processQueue(null, newToken);

            // 원래 요청 재시도
            requestHeaders.Authorization = `Bearer ${newToken}`;
            response = await fetch(`${this.baseURL}${endpoint}`, {
              ...requestConfig,
              headers: requestHeaders,
              credentials: 'include'
            });
          } catch (refreshError) {
            processQueue(refreshError as ApiError, null);
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }
      }

      // 응답이 성공적이지 않으면 에러 처리
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json().catch(() => ({
          statusCode: response.status,
          message: `HTTP error! status: ${response.status}`,
        }));
        throw new ApiError(errorData.message, response.status, errorData);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return {} as T;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError('네트워크 연결을 확인해주세요.', 0);
      }
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('알 수 없는 오류가 발생했습니다.', 0);
    }
  }

  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
);

export { ApiClient };