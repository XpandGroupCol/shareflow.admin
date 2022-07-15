import { USERS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getUsers } from 'services/users'

export const useGetUsers = (params) => {
  const { isError, isLoading, data } = useQuery([USERS, params], () => getUsers(params))

  return {
    isError,
    isLoading,
    data
  }
}
