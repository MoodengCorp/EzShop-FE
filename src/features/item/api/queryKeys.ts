import { ItemSearchParams } from '../types/item'

export const itemKeys = {
  all: ['item'] as const,
  lists: () => [...itemKeys.all, 'list'] as const,
  list: (params?: ItemSearchParams) =>
    [...itemKeys.lists(), { ...params }] as const,
  details: () => [...itemKeys.all, , 'detail'] as const,
  detail: (id: number) => [...itemKeys.details(), id] as const,
}
