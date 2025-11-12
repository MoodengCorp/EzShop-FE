import MyPageLayout from '@/components/layout/MyPageLayout'
import { ProtectedRoute } from '@/components/ui_custom/ProtectedRoute'

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <MyPageLayout>
        <div>프로필 페이지</div>
      </MyPageLayout>
    </ProtectedRoute>
  )
}
