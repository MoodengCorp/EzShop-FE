// src/features/auth/types/auth.ts

/**
 * 사용자 역할
 * ✅ 백엔드 Role enum과 일치
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
 * ✅ 백엔드 LoginRequestDto와 일치
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * 로그인 응답
 * ✅ 백엔드 LoginResponseDto와 일치
 */
export interface LoginResponse {
  name: string
  role: UserRole
  accessToken: string
  tokenType: string
}

/**
 * 토큰 갱신 응답
 * ✅ 백엔드 ReissueResponseDto와 일치
 */
export interface RefreshResponse {
  accessToken: string
}

/**
 * 디코딩된 JWT 토큰
 */
export interface DecodedToken {
  sub: string       // subject (email)
  role: UserRole
  iat: number       // 발급 시간
  exp: number       // 만료 시간
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
  address: string
  addressDetail: string
  role: UserRole
}

/**
 * 회원가입 API 요청 (백엔드로 전송)
 * - passwordConfirm 제외
 * ✅ 백엔드 SignupRequestDto와 완전히 일치
 */
export interface SignupRequest {
  email: string
  password: string
  name: string
  phone: string
  address: string
  addressDetail: string
  role: UserRole
}
