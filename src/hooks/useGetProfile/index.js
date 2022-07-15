import { PROFILE } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getProfile } from 'services/profile'

export const useGetProfile = () => {
  const { isError, isLoading, data } = useQuery([PROFILE], getProfile)

  return {
    isError,
    isLoading,
    data
  }
}
