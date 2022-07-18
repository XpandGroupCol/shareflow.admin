import CampaignDetails from 'components/campaignDetails'
import LoadingPage from 'components/loadingPage'
import { useGetCampaignById } from 'hooks/useGetCampaignById'
import { Navigate, useParams } from 'react-router-dom'

const CampaignViewPage = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetCampaignById(id)

  if (isLoading) return <LoadingPage text='Buscando campaña ...' />
  if (isError) {
    <Navigate to='/campaigns' />
    return
  }

  return (
    <CampaignDetails campaing={data?.data} />
  )
}

export default CampaignViewPage
