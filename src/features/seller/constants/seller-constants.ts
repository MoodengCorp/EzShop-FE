export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-200 text-yellow-800",
  DELIVERING: "bg-blue-200 text-blue-800",
  DELIVERED: "bg-green-200 text-green-800",
  CANCEL: "bg-gray-200 text-gray-800",
}

export const ORDER_STATUS_KR: Record<string, string> = {
  PENDING: "주문 접수",
  DELIVERING: "배송중",
  DELIVERED: "배송 완료",
  CANCEL: "주문 취소"
}

export const ITEM_STATUS_COLORS: Record<string, string> = {
  ALL: "bg-yellow-200 text-yellow-800",
  ACTIVE: "bg-blue-200 text-blue-800",
  SOLDOUT: "bg-green-200 text-green-800",
  HIDDEN: "bg-gray-200 text-gray-800",
}

export const ITEM_STATUS_KR: Record<string, string> = {
  ALL: "전체 상품",
  ACTIVE: "판매중",
  SOLDOUT: "품절",
  HIDDEN: "숨김"
}