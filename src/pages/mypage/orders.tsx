// pages/mypage/orders.tsx

import MyPageLayout from '@/components/layout/MyPageLayout'

export default function OrdersPage() {
  return (
    <MyPageLayout>
      <div>주문 내역 페이지</div>
    </MyPageLayout>
  )
}

// 컬러 참고
// <div className="p-6">
//   <h1 className="text-2xl font-bold mb-4">주문 내역</h1>
//   <div className="border rounded-lg p-4">
//     <p className="text-gray-600 mb-4">최근 주문 내역입니다.</p>
//     {/* 실제 주문 리스트 렌더링 */}
//     <div className="space-y-3">
//       <div className="border-b pb-3">
//         <p className="font-semibold">주문번호: 20250101-001</p>
//         <p className="text-sm text-gray-600">상품: 신선한 사과 외 2건</p>
//         <p className="text-sm">금액: 25,000원</p>
//       </div>
//       <div className="border-b pb-3">
//         <p className="font-semibold">주문번호: 20250102-002</p>
//         <p className="text-sm text-gray-600">상품: 유기농 우유 외 1건</p>
//         <p className="text-sm">금액: 15,000원</p>
//       </div>
//     </div>
//   </div>
// </div>