// src/hooks/useAuth.ts
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/features/auth'
import { authKeys } from '@/features/auth/api/queryKeys'
import { authApi } from '@/features/auth/api/authApi'
import { apiClient } from '@/lib/apiClient'
import { ApiError } from '@/types'

export const useAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    login: storeLogin,
    logout: storeLogout,
    isAuthenticated,
    name: storeName,
    role: storeRole,
  } = useAuthStore()

  // 현재 사용자 정보 조회
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated, // 자동으로 로그인 상태 추적
    staleTime: 10 * 60 * 1000, // 10분
  })

  // 회원가입 Mutation
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (response )=> {
      router.push('/')
    }

  })

  // 로그인 Mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const loginData = response.data
      if (!loginData) throw new Error('로그인 본문이 비어있습니다.')
      const { name, role, accessToken, tokenType } = loginData
      storeLogin(`${accessToken}`, name, role)

      // 사용자 정보 캐시 업데이트
      queryClient.setQueryData(['currentName'], loginData.name)

      router.push('/')
    },
  })

  // 로그아웃 Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiClient.get('/user/logout')
    },
    onSettled: () => {
      // 성공/실패 관계없이 로컬 로그아웃 수행
      storeLogout()

      // React Query 캐시 초기화
      queryClient.clear()

      const redirectTo = (router.query.redirect as string) || '/'
      router.push(redirectTo)
    },
  })

  return {
    // 상태
    isAuthenticated,
    name: storeName,
    isLoadingUser,
    storeRole,

    // 회원가입
    signup: signupMutation.mutate,
    signupAsync: signupMutation.mutateAsync,
    // 로그인
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error as ApiError | null,

    // 로그아웃
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,

    // 기타
    refetchUser,
  }
}