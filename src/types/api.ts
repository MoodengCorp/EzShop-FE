// src/types/api.ts

/**
 * 백엔드 API 에러 응답 형식
 */
export interface ApiErrorResponse {
  type: string      // 에러 타입 (예: "BAD_REQUEST", "UNAUTHORIZED")
  message: string   // 에러 메시지
}

/**
 * API 기본 응답 구조
 * - success: 요청 성공 여부
 * - data: 성공 시 데이터 (optional)
 * - error: 실패 시 에러 정보 (optional)
 * - statusCode: HTTP 상태 코드 (추가)
 */
export interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: ApiErrorResponse
  statusCode: number  // ✅ 추가: HTTP 상태 코드
}

/**
 * 커스텀 API 에러 클래스
 */
export class ApiError extends Error {
  readonly type: string
  readonly statusCode: number

  constructor(
    statusCode: number,
    response: ApiErrorResponse
  ) {
    super(response.message)
    this.name = 'ApiError'
    this.type = response.type
    this.statusCode = statusCode

    Object.setPrototypeOf(this, ApiError.prototype)
  }

  /**
   * 에러가 특정 타입인지 확인
   */
  isType(type: string): boolean {
    return this.type === type
  }

  /**
   * 인증 관련 에러인지 확인
   */
  isAuthError(): boolean {
    return this.type === 'UNAUTHORIZED' || this.type === 'FORBIDDEN'
  }

  /**
   * 유효성 검증 에러인지 확인
   */
  isValidationError(): boolean {
    return this.type === 'BAD_REQUEST' || this.type === 'VALIDATION_ERROR'
  }

  /**
   * 서버 에러인지 확인 (5xx)
   */
  isServerError(): boolean {
    return this.statusCode >= 500
  }

  /**
   * 네트워크 에러인지 확인
   */
  isNetworkError(): boolean {
    return this.statusCode === 0
  }
}

/**
 * HTTP 메서드
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * API 요청 설정
 */
export interface RequestConfig extends RequestInit {
  requiresAuth?: boolean
  params?: Record<string, string | number | boolean | undefined>
}