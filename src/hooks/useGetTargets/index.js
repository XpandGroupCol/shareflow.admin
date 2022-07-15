import { TARGETS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getTagets } from 'services/targets'

export const useGetTargets = (params) => {
  const { isError, isLoading, data, isRefetching } = useQuery([TARGETS, params], () => getTagets(params))

  return {
    isError,
    isLoading,
    data,
    isRefetching
  }
}
