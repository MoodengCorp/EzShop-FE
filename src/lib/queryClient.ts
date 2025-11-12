import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if(error?.statusCode === 401) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유효
    },
    mutations: {
      retry: false, // Mutation은 자동 재시도하지 않는다.
    }
  }
})