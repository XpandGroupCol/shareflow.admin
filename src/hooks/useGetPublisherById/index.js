import { PUBLISHERS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getPublisherById } from 'services/publishers'

export const useGetPublisherById = (id) => {
  const { isError, isLoading, data } = useQuery([PUBLISHERS, id], () => getPublisherById(id))

  return {
    isError,
    isLoading,
    data
  }
}
