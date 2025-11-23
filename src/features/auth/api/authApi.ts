import { LoginRequest, LoginResponse } from '@/features/auth'
import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types'
import { SignupFormData } from '@/features/auth/types/auth'

/**
 * signup, login, logout
 */
export const authApi = {
  signup: (request: SignupFormData) =>
    apiClient.post<ApiResponse<void>>('/user/signup', request, {
      requiresAuth: false,
    }),
  login: (request: LoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/user/login', request, {
      requiresAuth: false,
    }),
  logout: () => apiClient.get<ApiResponse<void>>('/user/logout'),
}
