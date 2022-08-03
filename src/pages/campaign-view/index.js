import CampaignDetails from 'components/campaignDetails'
import LoadingPage from 'components/loadingPage'
import { useEditGlobalCampaigns } from 'providers/EditCampaingProvider'

import { Navigate } from 'react-router-dom'

const CampaignOrderPage = () => {
  const { globalCampaign, loading, error } = useEditGlobalCampaigns()

  if (loading) return <LoadingPage text='Buscando orden ...' />
  if (error) return <Navigate to='/campaigns' />

  return (
    <CampaignDetails
      campaing={globalCampaign}
    />
  )
}

export default CampaignOrderPage
