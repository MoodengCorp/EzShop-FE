import { ErrorHandlerOptions, handleApiError } from '@/lib/errorHandler'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useErrorHandler = (error: unknown, options?: ErrorHandlerOptions) => {
  const router = useRouter()
  useEffect(() => {
    if(error) {
      handleApiError(error, router, options)
    }
  })
}