// src/pages/mypage/profile.tsx
import MyPageLayout from '@/components/layout/MyPageLayout'
import { ProtectedRoute } from '@/guards/ProtectedRoute'
import { ProfilePage } from '@/features/user'

export default function ProfilePageRoute() {
  return (
    <ProtectedRoute>
      <MyPageLayout>
        <ProfilePage />
      </MyPageLayout>
    </ProtectedRoute>
  )
}