import { LoginRequest, LoginResponse, User } from '@/features/auth'
import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types'


/**
 * login, logout, getCurrentUser
 */
export const authApi = {
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