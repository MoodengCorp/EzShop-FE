import { LoginRequest, LoginResponse, User } from '@/features/auth'
import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types'
import { SignupRequest } from '@/features/auth/types/auth'


/**
 * login, logout, getCurrentUser
 */
export const authApi = {
  signup: (request : SignupRequest) => (
    apiClient.post<ApiResponse<void>>('/user/signup', request, {requiresAuth: false})
  ),
  login : (credentials : LoginRequest)=> (
    apiClient.post<ApiResponse<LoginResponse>>(
      '/user/login',
      credentials,
      {requiresAuth: false}
    )
  ),
  logout: () =>
    apiClient.get('/user/logout'),
  getCurrentUser: (): Promise<User> => (
    apiClient.get<User>('/user/info')
  )
}