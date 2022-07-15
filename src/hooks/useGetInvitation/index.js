import { INVITATION } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getInvitation } from 'services/invitation'

export const useGetInvitation = (params) => {
  const { isError, isLoading, data } = useQuery([INVITATION, params], () => getInvitation(params))

  return {
    isError,
    isLoading,
    data
  }
}
