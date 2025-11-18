import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types/api'
import {
  UserInfo,
  UserProfileFormData,
  VerifyPasswordRequest,
} from '../types/user'

export const userApi = {
  getProfile: (): Promise<UserInfo> =>
    apiClient.get<UserInfo>('/user/profile'),

  updateProfile: (data: UserProfileFormData) =>
    apiClient.put<ApiResponse<void>>('/user/profile', data),

  verifyPassword: (data: VerifyPasswordRequest) =>
    apiClient.post<ApiResponse<void>>('/user/passwordcheck', data),
}