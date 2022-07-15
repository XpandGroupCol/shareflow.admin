import { USERS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getUserById } from 'services/users'

export const useGetUserById = (id) => {
  const { isError, isLoading, data } = useQuery([USERS, id], () => getUserById(id))

  return {
    isError,
    isLoading,
    data
  }
}
