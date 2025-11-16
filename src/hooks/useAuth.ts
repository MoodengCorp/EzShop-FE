// src/hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest, LoginResponse, User } from '@/types/auth';
import { ApiError, ApiResponse } from '@/types/api'

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    login: storeLogin,
    logout: storeLogout,
    isAuthenticated,
    name: storeName,
    role: storeRole,
  } = useAuthStore();

  // 현재 사용자 정보 조회
  const {
    data: currentName,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['currentName'],
    queryFn: () => apiClient.get<User>('/user/info'),
    enabled: false,
    staleTime: 10 * 60 * 1000, // 10분
  });

  // 로그인 Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return apiClient.post<ApiResponse<LoginResponse>>('/user/login', credentials, {
        requiresAuth: false,
      });
    },
    onSuccess: (response) => {
      const loginData = response.data;
      if(!loginData) throw new Error("로그인 본문이 비어있습니다.");
      const {name, role, accessToken, tokenType } = loginData;
      storeLogin(`${accessToken}`, name, role);

      // 사용자 정보 캐시 업데이트
      queryClient.setQueryData(['currentName'], loginData.name);

      router.push('/');
    },
  });

  // 로그아웃 Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiClient.get('/user/logout');
    },
    onSettled: () => {
      // 성공/실패 관계없이 로컬 로그아웃 수행
      storeLogout();

      // React Query 캐시 초기화
      queryClient.clear();

      const redirectTo = (router.query.redirect as string) || '/';
      router.push(redirectTo);
    },
  });

  return {
    // 상태
    isAuthenticated,
    name: storeName,
    isLoadingUser,

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
  };
};