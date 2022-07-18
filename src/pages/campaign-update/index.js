import CampaignEditForm from 'components/campaigns/edit'
import { useGlobalCampaigns } from 'providers/CampaingProvider'

const CampaignUpdatePage = () => {
  const {
    globalCampaign,
    setGlobalCampaign,
    loading,
    error,
    lists
  } = useGlobalCampaigns()

  if (loading) return <h1>Cargando...</h1>
  if (error) return <h1>Error</h1>

  return (
    <CampaignEditForm
      updateCampaign={setGlobalCampaign}
      campaign={globalCampaign}
      {...lists}
    />
  )
}

export default CampaignUpdatePage
