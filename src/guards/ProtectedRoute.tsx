// src/components/common/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/features/auth/store/authStore';
import { apiClient } from '@/lib/apiClient';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
                                 children,
                                 redirectTo = '/auth/Login',
                               }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false); // ✅ 필수!
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // 1. 하이드레이션 체크
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 2. 인증 검증 (하이드레이션 완료 후)
  useEffect(() => {
    const validateAuth = async () => {
      // ✅ 하이드레이션 전에는 실행 안함
      if (!isHydrated) {
        return;
      }

      console.log('🔐 페이지 접근 시도:', router.asPath);

      // 인증되지 않았으면 로그인 페이지로
      if (!isAuthenticated) {
        console.log('❌ 인증 안됨 → 로그인 페이지');
        router.replace(`${redirectTo}?redirect=${encodeURIComponent(router.asPath)}`);
        return;
      }

      // 인증되어 있으면 API 호출로 토큰 유효성 검증
      try {
        console.log('🔍 토큰 검증 중...');
        await apiClient.get('/user/info');
        console.log('✅ 인증 유효 → 페이지 접근 허용');
        setIsValid(true);
        setIsValidating(false);
      } catch (error: any) {
        console.error('❌ 인증 실패 (토큰 갱신 실패) → 로그인 페이지');
        logout();
        router.replace(`${redirectTo}?redirect=${encodeURIComponent(router.asPath)}`);
      }
    };

    validateAuth();
  }, [isHydrated, isAuthenticated, router.asPath]); // ✅ isHydrated 의존성 추가

  // 하이드레이션 전이거나 검증 중
  if (!isHydrated || isValidating || !isValid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">
            {!isHydrated ? '로딩 중...' : '인증 확인 중...'}
          </p>
        </div>
      </div>
    );
  }

  // 인증 완료, 페이지 렌더링
  return <>{children}</>;
}