// src/types/user.ts
// 사용자 정보 관련 타입

import { UserRole } from './auth'

/**
 * 사용자 상세 정보
 */
export interface UserInfo {
  email: string
  name: string
  phone: string
  address?: string
  addressDetail?: string
  role?: UserRole
}

/**
 * 사용자 정보 수정 폼 데이터 (프론트엔드)
 */
export interface UpdateUserInfoFormData {
  currentPassword?: string
  newPassword?: string
  newPasswordConfirm?: string  // 프론트 검증용
  name: string
  phone: string
  address?: string
  addressDetail?: string
}

/**
 * 사용자 정보 수정 API 요청 (백엔드로 전송)
 * - newPasswordConfirm 제외
 */
export interface UpdateUserInfoRequest {
  currentPassword?: string
  newPassword?: string  // newPasswordConfirm 없음
  name: string
  phone: string
  address?: string
  addressDetail?: string
}

/**
 * 비밀번호 확인 요청
 */
export interface PasswordCheckRequest {
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
  newPassword: string  // newPasswordConfirm 없음
}

/**
 * 배송지 정보
 */
export interface DeliveryAddress {
  recipientName: string
  phone: string
  address: string
  addressDetail?: string
  deliveryRequest?: string
  isDefault?: boolean
}