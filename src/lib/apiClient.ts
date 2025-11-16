// src/lib/apiClient.ts
import { ApiError, ApiResponse } from '@/types/api'
import { CLIENT_ERROR_TYPE, HTTP_STATUS } from '@/constants'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/authStore'

let isRefreshing = false
let refreshPromise: Promise<string> | null = null
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: ApiError) => void
}> = []

const processQueue = (error: ApiError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else if (token) {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    }
  }

  private async refreshAccessToken(): Promise<string> {
    if (refreshPromise) {
      return refreshPromise
    }

    refreshPromise = (async () => {
      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        throw new ApiError(
          '리프레시 토큰이 없습니다.',
          CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
          HTTP_STATUS.UNAUTHORIZED
        )
      }

      try {
        const response = await fetch(`${this.baseURL}/user/reissue`, {
          method: 'POST',
          credentials: 'include',
          headers: this.defaultHeaders,
        })

        if (!response.ok) {
          throw new ApiError(
            '토큰 갱신에 실패했습니다.',
            CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
            response.status
          )
        }

        const apiResponse: ApiResponse<{ accessToken: string }> =
          await response.json()

        // ✅ 백엔드 에러를 그대로 전달
        if (!apiResponse.success || !apiResponse.data) {
          throw new ApiError(
            apiResponse.error?.message || '토큰 갱신에 실패했습니다.',
            apiResponse.error?.type || CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
            response.status,
            apiResponse.error
          )
        }

        const newAccessToken = apiResponse.data.accessToken
        useAuthStore.getState().setAccessToken(newAccessToken)
        return newAccessToken
      } catch (error) {
        useAuthStore.getState().logout()
        throw error
      }
    })()

    try {
      const token = await refreshPromise
      return token
    } finally {
      refreshPromise = null
    }
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, headers = {}, ...restConfig } = config

    const requestHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...(headers as Record<string, string>),
    }

    if (requiresAuth) {
      const token = useAuthStore.getState().accessToken
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`
      }
    }

    const requestConfig: RequestInit = {
      ...restConfig,
      headers: requestHeaders,
      credentials: 'include',
    }

    try {
      let response = await fetch(`${this.baseURL}${endpoint}`, requestConfig)

      // 401 에러 처리 (토큰 만료)
      if (response.status === HTTP_STATUS.UNAUTHORIZED && requiresAuth) {
        if (isRefreshing) {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })

          const retryHeaders = {
            ...this.defaultHeaders,
            ...(headers as Record<string, string>),
            Authorization: `Bearer ${token}`,
          }

          response = await fetch(`${this.baseURL}${endpoint}`, {
            ...restConfig,
            headers: retryHeaders,
            credentials: 'include',
          })
        } else {
          isRefreshing = true
          try {
            const newToken = await this.refreshAccessToken()
            processQueue(null, newToken)

            const retryHeaders = {
              ...this.defaultHeaders,
              ...(headers as Record<string, string>),
              Authorization: `Bearer ${newToken}`,
            }

            response = await fetch(`${this.baseURL}${endpoint}`, {
              ...restConfig,
              headers: retryHeaders,
              credentials: 'include',
            })
          } catch (refreshError) {
            processQueue(refreshError as ApiError, null)
            throw refreshError
          } finally {
            isRefreshing = false
          }
        }
      }

      // ✅ 응답이 성공적이지 않으면 백엔드 에러를 그대로 throw
      if (!response.ok) {
        const errorData: ApiResponse = await response
          .json()
          .catch(() => ({
            success: false,
            error: {
              type: CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
              message: `HTTP error! status: ${response.status}`,
            },
          }))

        // ✅ 백엔드에서 온 에러 정보를 그대로 사용
        throw new ApiError(
          errorData.error?.message || '요청 처리 중 오류가 발생했습니다.',
          errorData.error?.type || CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
          response.status,
          errorData.error
        )
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return response.json()
      }

      return {} as T
    } catch (error) {
      // ✅ 네트워크 에러만 프론트에서 처리
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError(
          '네트워크 연결을 확인해주세요.',
          CLIENT_ERROR_TYPE.NETWORK_ERROR,
          0
        )
      }
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        '알 수 없는 오류가 발생했습니다.',
        CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
        0
      )
    }
  }

  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
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
    })
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
    })
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
    })
  }

  async delete<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
)

export { ApiClient }