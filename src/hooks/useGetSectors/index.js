import { SECTORS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getSectors } from 'services/sectors'

export const useGetSectors = (params) => {
  const { isError, isLoading, data, isRefetching } = useQuery([SECTORS, params], () => getSectors(params))

  return {
    isError,
    isLoading,
    data,
    isRefetching
  }
}
