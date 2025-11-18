/**
 * 프론트엔드 전용 에러 타입
 * - 백엔드와 무관한 클라이언트 측 에러만 정의
 */
export const CLIENT_ERROR_TYPE = {
  NETWORK_ERROR: 'NETWORK_ERROR',    // fetch 실패
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',    // 예상치 못한 에러
} as const

export type ClientErrorType = (typeof CLIENT_ERROR_TYPE)[keyof typeof CLIENT_ERROR_TYPE]

/**
 * HTTP 상태 코드 (필요 시 사용)
 */
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const