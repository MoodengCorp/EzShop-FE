import { ProtectedRoute } from '@/guards/ProtectedRoute'
import MyPageLayout from '@/components/layout/MyPageLayout'

export default function manageItems(){
  return (
      <ProtectedRoute>
        <MyPageLayout>
          <div>상품 관리</div>
        </MyPageLayout>
      </ProtectedRoute>
  )
}