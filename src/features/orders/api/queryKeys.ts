import { OrderPeriod } from '@/features/orders/types/order'

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (period: OrderPeriod, search: string) =>
    [...orderKeys.lists(), { period, search }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: number) => [...orderKeys.details(), id] as const,
}
