import { CAMPAINGS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getCampaigns } from 'services/campaigns'

export const useGetCampaigns = (params) => {
  const { isError, isLoading, data } = useQuery([CAMPAINGS, params], () => getCampaigns(params))

  return {
    isError,
    isLoading,
    data
  }
}
