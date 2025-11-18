// src/features/user/types/user.ts
// 사용자 정보 관련 타입

import { UserRole } from '@/features/auth'

/**
 * 사용자 상세 정보
 * ✅ 백엔드 ProfileResponseDto와 일치
 */
export interface UserInfo {
  email: string
  name: string
  phone: string
  address: string
  addressDetail: string  // ✅ 백엔드와 일치
  role: UserRole
}

/**
 * 사용자 정보 수정 폼 데이터 (프론트엔드)
 * ✅ 백엔드 ProfileUpdateRequestDto와 일치 (newPassword만 제외)
 */
export interface UpdateUserInfoFormData {
  name: string
  phone: string
  address: string
  addressDetail: string  // ✅ 백엔드와 일치
}

/**
 * 사용자 정보 수정 API 요청 (백엔드로 전송)
 * - newPasswordConfirm 제외
 * ✅ 백엔드 ProfileUpdateRequestDto와 완전히 일치
 */
export interface UpdateUserInfoRequest {
  currentPassword?: string
  newPassword?: string
  name: string
  phone: string
  address: string
  addressDetail: string  // ✅ 백엔드와 일치
}

/**
 * 비밀번호 확인 요청
 * ✅ 백엔드 PasswordCheckRequestDto와 일치
 */
export interface VerifyPasswordRequest {
  password: string
}

/**
 * 비밀번호 변경 폼 데이터 (프론트엔드)
 */
export interface PasswordChangeFormData {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string  // 프론트 검증용
}

/**
 * 비밀번호 변경 API 요청 (백엔드로 전송)
 */
export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
}
