export const sellerOrderKeys = {
  all: ['sellerOrders'] as const,
  lists: () => [...sellerOrderKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...sellerOrderKeys.lists(), filters] as const,
  statusCounts: () => [...sellerOrderKeys.all, 'statusCounts'] as const,
}