import { useRouter } from 'next/router'
import { OrderPeriod } from '../types/order'

export const useOrderFilters = () => {
  const router = useRouter()

  const period = (router.query.period as OrderPeriod) || '3개월'

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

  return { period, setPeriod, }
}