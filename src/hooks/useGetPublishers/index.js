import { PUBLISHERS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getPublishers } from 'services/publishers'

export const useGetPublishers = (params) => {
  const { isError, isLoading, data } = useQuery([PUBLISHERS, params], () => getPublishers(params))

  return {
    isError,
    isLoading,
    data
  }
}
