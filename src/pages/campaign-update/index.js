import CampaignEditForm from 'components/campaigns/edit'
import LoadingPage from 'components/loadingPage'
import { useGlobalCampaigns } from 'providers/CampaingProvider'
import { Navigate } from 'react-router-dom'

const CampaignUpdatePage = () => {
  const {
    globalCampaign,
    setGlobalCampaign,
    loading,
    error,
    lists
  } = useGlobalCampaigns()

  if (loading) return <LoadingPage text='Buscando campaña ...' />
  if (error) {
    <Navigate to='/campaigns' />
    return
  }

  return (
    <CampaignEditForm
      updateCampaign={setGlobalCampaign}
      campaign={globalCampaign}
      {...lists}
    />
  )
}

export default CampaignUpdatePage
