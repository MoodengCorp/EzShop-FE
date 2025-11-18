import { useRouter } from 'next/router'
import { OrderPeriod } from '../types/order'

export const useOrderFilters = () => {
  const router = useRouter()

  const period = (router.query.period as OrderPeriod) || '3개월'
  const searchQuery = (router.query.search as string) || ''

  const setPeriod = (newPeriod: OrderPeriod) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, period: newPeriod },
      },
      undefined,
      { shallow: true }
    )
  }

  const setSearchQuery = (query: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: query },
      },
      undefined,
      { shallow: true }
    )
  }

  return { period, searchQuery, setPeriod, setSearchQuery }
}