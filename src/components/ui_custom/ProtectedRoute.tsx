import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/authStore'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
  loadingComponent?: ReactNode
}

export function ProtectedRoute({
  children,
  redirectTo = '/auth/Login',
  loadingComponent,
}: ProtectedRouteProps) {
  const router = useRouter();
  const {isAuthenticated, isTokenValid} = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && (!isAuthenticated || !isTokenValid())) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [isHydrated, isAuthenticated, isTokenValid, router, redirectTo]);

  // 인증 확인 중이면 로딩 표시
  if (!isHydrated) {
    return (
      loadingComponent || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">로딩 중...</p>
          </div>
        </div>
      )
    );
  }
  if (!isAuthenticated || !isTokenValid()) {
    return (
      <>
        {loadingComponent || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">로딩 중...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
