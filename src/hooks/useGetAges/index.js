import { AGES } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getAges } from 'services/ages'

export const useGetAges = (params) => {
  const { isError, isLoading, data, isRefetching } = useQuery([AGES, params], () => getAges(params))

  return {
    isError,
    isLoading,
    data,
    isRefetching
  }
}
