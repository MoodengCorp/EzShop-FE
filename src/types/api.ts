// 주문 타입
export type Order = {
  id: number,
  orderNumber: number
  productName: string
  amount: number
  orderDate: string
  status: string
  thumbnailUrl: string
  price: number
}

// 성공 응답
export type SuccessResponse<T> = {
  success: true
  data: T
}

// 에러 응답
export type ErrorResponse = {
  success: false
  error: {
    code: string
    message: string
  }
}

// API 응답 타입
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

// 주문 목록 응답
export type OrdersData = {
  orders: Order[]
  total: number
}