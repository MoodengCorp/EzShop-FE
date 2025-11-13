// src/lib/apiClient.ts
import { ApiError, ErrorResponse, RefreshResponse } from '@/types/auth';
import { ApiResponse } from '@/types/order'; // 또는 공통 타입 위치
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
      try {
        console.log('🔄 토큰 갱신 요청 전송 (/user/reissue)');

        const response = await fetch(`${this.baseURL}/user/reissue`, {
          method: 'POST',
          credentials: 'include',
          headers: this.defaultHeaders,
        });

        console.log('📥 토큰 갱신 응답:', response.status);

        if (!response.ok) {
          throw new ApiError('토큰 갱신 요청 실패', response.status);
        }

        // ✅ ApiResponse 구조로 받기
        const apiResponse: ApiResponse<RefreshResponse> = await response.json();
        console.log('📦 응답 데이터:', apiResponse);

        // ✅ success 체크
        if (!apiResponse.success || !apiResponse.data) {
          const errorMessage = apiResponse.error?.message || '토큰 갱신에 실패했습니다.';
          console.error('❌ 토큰 갱신 실패:', apiResponse.error);
          throw new ApiError(errorMessage, response.status);
        }

        // ✅ data에서 accessToken 추출
        const newAccessToken = apiResponse.data.accessToken;
        console.log('✅ 새 액세스 토큰 받음');

        useAuthStore.getState().setAccessToken(newAccessToken);
        return newAccessToken;
      } catch (error) {
        console.error('❌ 토큰 갱신 중 에러:', error);
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

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, headers = {}, ...restConfig } = config;

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
      credentials: 'include',
    };

    try {
      let response = await fetch(`${this.baseURL}${endpoint}`, requestConfig);

      if (response.status === 401 && requiresAuth) {
        if (isRefreshing) {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });

          const retryHeaders = {
            ...this.defaultHeaders,
            ...(headers as Record<string, string>),
            Authorization: `Bearer ${token}`,
          };

          response = await fetch(`${this.baseURL}${endpoint}`, {
            ...restConfig,
            headers: retryHeaders,
            credentials: 'include',
          });
        } else {
          isRefreshing = true;
          try {
            const newToken = await this.refreshAccessToken();
            processQueue(null, newToken);

            const retryHeaders = {
              ...this.defaultHeaders,
              ...(headers as Record<string, string>),
              Authorization: `Bearer ${newToken}`,
            };

            response = await fetch(`${this.baseURL}${endpoint}`, {
              ...restConfig,
              headers: retryHeaders,
              credentials: 'include',
            });
          } catch (refreshError) {
            processQueue(refreshError as ApiError, null);
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }
      }

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