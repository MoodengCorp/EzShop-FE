
import { apiClient } from '@/lib/apiClient'
import { ApiResponse } from '@/types/api'
import { SellerItemCreateRequest } from '@/features/seller/register_items/types/register-items.types'

export const registerItemApi = {
  create: async ({ payload }: { payload: FormData }) => {
    return apiClient.post<ApiResponse<void>>('/item', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

export function buildRegisterItemPayload(
  request: SellerItemCreateRequest,
): FormData {
  const formData = new FormData()
  formData.append('dto', new Blob([JSON.stringify(request.dto)], { type: 'application/json' }))

  if (request.thumbnailFile) {
    formData.append('thumbnailFile', request.thumbnailFile)
  }

  if (request.detailImageFile) {
    formData.append('detailImageFile', request.detailImageFile)
  }

  return formData
}