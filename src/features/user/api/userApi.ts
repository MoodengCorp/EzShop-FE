import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types/api'
import {
  PasswordChangeRequest, UpdateUserInfoFormData,
  UserInfo,
  VerifyPasswordRequest,
} from '../types/user'

export const userApi = {
  getProfile: () =>
    apiClient.get<ApiResponse<UserInfo>>('/user/info'),

  updateProfile: (data: UpdateUserInfoFormData) =>
    apiClient.patch<ApiResponse<void>>('/user', data),

  verifyPassword: (data: VerifyPasswordRequest) =>
    apiClient.post<ApiResponse<void>>('/user/passwordcheck', data),

  changePassword: (data: PasswordChangeRequest) =>
    apiClient.patch<ApiResponse<void>>('/user/password', data),
}