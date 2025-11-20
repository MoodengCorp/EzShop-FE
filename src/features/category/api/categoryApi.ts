import { apiClient } from '@/lib/apiClient'
import { ApiError, ApiResponse } from '@/types'

interface categoryListResponse {
  categories: string[]
}

/**
 * signup, login, logout
 */
export const categoryApi = {
  getAllCategories: async () => {
    const response = await apiClient
      .get<ApiResponse<categoryListResponse>>('/category')
      .then((target) => {
        if (!target.success) {
          throw new ApiError(target.statusCode, target.error!)
        }
        return target.data
      })
    return response?.categories
  },
}
