import CampaignDetails from 'components/campaignDetails'
import { useGetCampaignById } from 'hooks/useGetCampaignById'
import { useParams } from 'react-router-dom'

const CampaignViewPage = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetCampaignById(id)

  if (isLoading) return <h1>Cargando ...</h1>
  if (isError) return <h1>error ...</h1>

  return (
    <CampaignDetails campaing={data?.data} />
  )
}

export default CampaignViewPage
