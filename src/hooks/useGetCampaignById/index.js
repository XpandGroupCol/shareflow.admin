import { CAMPAINGS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getCampaignById } from 'services/campaigns'

export const useGetCampaignById = (id) => {
  const { isError, isLoading, data } = useQuery([CAMPAINGS, id], () => getCampaignById(id), {
    cacheTime: 2000
  })

  return {
    isError,
    isLoading,
    data
  }
}
