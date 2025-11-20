// src/features/category/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/features/category/api/categoryApi'

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
}

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: categoryApi.getAllCategories,
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지 (카테고리는 자주 변경되지 않으므로)
  })
}