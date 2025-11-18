// src/lib/apiClient.ts
import { ApiError, ApiResponse, RequestConfig } from '@/types/api'
import { CLIENT_ERROR_TYPE, HTTP_STATUS } from '@/constants'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/features/auth/store/authStore'

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

  /**
   * Query params를 URL에 추가하는 헬퍼 함수
   * @param endpoint - 기본 엔드포인트
   * @param params - query params 객체
   * @returns query string이 추가된 URL
   */
  private buildUrlWithParams(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): string {
    if (!params) {
      return endpoint
    }

    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      // undefined나 null은 제외
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })

    const queryString = searchParams.toString()

    // query string이 있으면 추가
    if (queryString) {
      // endpoint에 이미 ?가 있으면 &로 연결, 없으면 ?로 시작
      const separator = endpoint.includes('?') ? '&' : '?'
      return `${endpoint}${separator}${queryString}`
    }

    return endpoint
  }

  /**
   * 토큰 갱신
   */
  private async refreshAccessToken(): Promise<string> {
    if (refreshPromise) {
      return refreshPromise
    }

    refreshPromise = (async () => {
      const refreshToken = Cookies.get('refresh_token')
      if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, {
          type: CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
          message: '리프레시 토큰이 없습니다.',
        })
      }

      const response = await fetch(`${this.baseURL}/user/reissue`, {
        method: 'POST',
        credentials: 'include',
        headers: this.defaultHeaders,
      })

      const apiResponse: ApiResponse<{ accessToken: string }> = await response.json()

      if (!response.ok || !apiResponse.success || !apiResponse.data) {
        useAuthStore.getState().logout()
        throw new ApiError(response.status, apiResponse.error || {
          type: CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
          message: '토큰 갱신에 실패했습니다.',
        })
      }

      const newAccessToken = apiResponse.data.accessToken
      useAuthStore.getState().setAccessToken(newAccessToken)
      return newAccessToken
    })()

    try {
      return await refreshPromise
    } finally {
      refreshPromise = null
    }
  }

  /**
   * 401 에러 처리 (토큰 갱신 후 재요청)
   */
  private async handleUnauthorized(
    endpoint: string,
    config: RequestInit
  ): Promise<Response> {
    // 이미 갱신 중이면 대기
    if (isRefreshing) {
      const token = await new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })

      // Headers 객체를 복사하고 새 토큰으로 업데이트
      const retryHeaders = new Headers(config.headers)
      retryHeaders.set('Authorization', `Bearer ${token}`)

      return fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        headers: retryHeaders,
        credentials: 'include',
      })
    }

    // 토큰 갱신 시작
    isRefreshing = true
    try {
      const newToken = await this.refreshAccessToken()
      processQueue(null, newToken)

      // Headers 객체를 복사하고 새 토큰으로 업데이트
      const retryHeaders = new Headers(config.headers)
      retryHeaders.set('Authorization', `Bearer ${newToken}`)

      return fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        headers: retryHeaders,
        credentials: 'include'
      })
    } catch (error) {
      processQueue(error as ApiError, null)
      throw error
    } finally {
      isRefreshing = false
    }
  }

  /**
   * Response를 ApiResponse로 변환하고 에러 체크
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')

    // JSON 응답 파싱
    let jsonData;
    if (contentType && contentType.includes('application/json')) {
      jsonData = await response.json()
    } else {
      jsonData = {}
    }

    // statusCode 추가
    const result = {
      ...jsonData,
      statusCode: response.status,
    }

    // 응답이 실패인 경우 에러 throw
    if (!response.ok) {
      throw new ApiError(
        response.status,
        result.error || {
          type: CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
          message: `예상치 못한 에러가 발생했습니다: ${response.status}`,
        }
      )
    }
    return result as T
  }

  /**
   * 공통 요청 메서드
   * - HTTP 메서드(GET, POST 등)는 각 래퍼 메서드에서 config.method로 전달됨
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requiresAuth = true, params, headers, ...restConfig } = config

    // ✨ params가 있으면 URL에 추가
    const urlWithParams = this.buildUrlWithParams(endpoint, params)

    // Headers 객체 생성 및 구성
    const requestHeaders = new Headers(this.defaultHeaders)

    // 사용자가 전달한 헤더 추가
    if (headers) {
      const headerEntries = headers instanceof Headers
        ? headers.entries()
        : Object.entries(headers)

      for (const [key, value] of headerEntries) {
        requestHeaders.set(key, value as string)
      }
    }

    // 인증 토큰 추가
    if (requiresAuth) {
      const token = useAuthStore.getState().accessToken
      if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`)
      }
    }

    const requestConfig: RequestInit = {
      ...restConfig,  // method, body 등이 여기 포함됨
      headers: requestHeaders,
      credentials: 'include',
    }

    try {
      // 1. 요청 전송 (params가 추가된 URL 사용)
      let response = await fetch(`${this.baseURL}${urlWithParams}`, requestConfig)

      // 2. 401 에러면 토큰 갱신 후 재요청
      if (response.status === HTTP_STATUS.UNAUTHORIZED && requiresAuth) {
        response = await this.handleUnauthorized(urlWithParams, requestConfig)
      }

      // 3. 응답 파싱 및 에러 체크
      return await this.parseResponse<T>(response)

    } catch (error) {
      // 네트워크 에러 (fetch 자체가 실패)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiError(0, {
          type: CLIENT_ERROR_TYPE.NETWORK_ERROR,
          message: '네트워크 연결을 확인해주세요.',
        })
      }

      // 이미 ApiError면 그대로 throw
      if (error instanceof ApiError) {
        throw error
      }

      // 예상치 못한 에러
      throw new ApiError(0, {
        type: CLIENT_ERROR_TYPE.UNKNOWN_ERROR,
        message: '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  /**
   * GET 요청
   * - request()에 method: 'GET'을 전달
   * - params를 통해 query string 추가 가능
   */
  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  /**
   * POST 요청
   * - request()에 method: 'POST'와 body를 전달
   */
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

  /**
   * PUT 요청
   */
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

  /**
   * PATCH 요청
   */
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

  /**
   * DELETE 요청
   */
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