import MyPageLayout from '@/components/layout/MyPageLayout'
import { ProtectedRoute } from '@/components/ui_custom/ProtectedRoute'

export default function CouponsPage() {
  return (
    <ProtectedRoute>
      <MyPageLayout>
        <div>쿠폰 페이지</div>
      </MyPageLayout>
    </ProtectedRoute>
  )
}
