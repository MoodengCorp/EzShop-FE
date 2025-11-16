// src/types/auth.ts
// 인증 관련 타입

/**
 * 사용자 역할
 */
export type UserRole = 'USER' | 'SELLER'

/**
 * 사용자 기본 정보
 */
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  name: string
  role: UserRole
  accessToken: string
  tokenType: string
}

/**
 * 토큰 갱신 응답
 */
export interface RefreshResponse {
  accessToken: string
}

/**
 * 디코딩된 JWT 토큰
 * - 백엔드가 토큰에 담는 정보에 따라 수정 필요
 */
export interface DecodedToken {
  sub: string       // subject (userId 대신 사용하는 경우)
  role: UserRole    // 역할 (백엔드가 담는 경우)
  iat: number        // 발급 시간 (필수)
  exp: number        // 만료 시간 (필수)
  // userId는 백엔드가 토큰에 담지 않으므로 제거
}

/**
 * 회원가입 폼 데이터 (프론트엔드 전용)
 * - passwordConfirm은 프론트에서만 검증용
 */
export interface SignupFormData {
  email: string
  password: string
  passwordConfirm: string  // 프론트 검증용
  name: string
  phone: string
  role?: UserRole
}

/**
 * 회원가입 API 요청 (백엔드로 전송)
 * - passwordConfirm 제외
 */
export interface SignupRequest {
  email: string
  password: string  // passwordConfirm 없음
  name: string
  phone: string
  role?: UserRole
}