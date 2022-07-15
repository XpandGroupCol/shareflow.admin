import { LISTS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getLists } from 'services/lists'

export const useGetLists = () => {
  const { isError, isLoading, data } = useQuery([LISTS], () => getLists())

  return {
    isError,
    isLoading,
    data
  }
}
