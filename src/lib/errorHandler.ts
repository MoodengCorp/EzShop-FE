import { ApiError } from '@/types/api'
import { toast } from 'sonner'
import { NextRouter } from 'next/router'

export interface ErrorHandlerOptions {
  onAuthError?: () => void
  onNotFoundError?: () => void
  showToast?: boolean
}

export const handleApiError = (
  error: unknown,
  router: NextRouter,
  options: ErrorHandlerOptions = {}
) => {
  const {
    onAuthError = () => router.push('/auth/Login'),
    onNotFoundError,
    showToast = true,
  } = options

  if (!(error instanceof ApiError)) {
    if (showToast) toast.error('알 수 없는 오류가 발생했습니다.', {
      position: 'top-center'
    })
    return
  }

  if (error.isAuthError()) {
    if (showToast) toast.error('로그인이 필요합니다.', {
      position: 'top-center'
    })
    onAuthError()
    return
  }

  if (error.statusCode === 404) {
    if (showToast) toast.error('요청하신 정보를 찾을 수 없습니다.', {
      position: 'top-center'
    })
    onNotFoundError?.()
    return
  }

  if (showToast) toast.error(error.message, {
    position: 'top-center'
  })
}