export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/Login',
  MY_ORDERS: '/mypage/orders',
  MY_ORDER_DETAIL: (id: string | number) => `/mypage/orders/${id}`,
  MY_PROFILE: '/mypage/profile',
} as const