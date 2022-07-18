import CampaignPublisherForm from 'components/campaignPublisherForm'
import { MAX_SHARE_VALUE } from 'configs'
import { useNotify } from 'hooks/useNotify'
import { useGlobalCampaigns } from 'providers/CampaingProvider'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateCampaign } from 'services/campaigns'
import { clearCampaign, getSummaryInformation, getTotalShare } from 'utils/normalizeData'

const CampaignPublisherPage = () => {
  const { globalCampaign, loading, error, id } = useGlobalCampaigns()
  const notify = useNotify()
  const navigate = useNavigate()

  const { isLoading, mutateAsync } = useMutation(updateCampaign)

  if (loading) return <h1>loading</h1>

  if (error) return <h1>Error</h1>

  if (!globalCampaign?.listOffPublishers?.length) return <Navigate to={`/campaigns/${id}/edit`} />

  const onSubmit = (values) => {
    const { publishers, _id, ...restOfValues } = values

    if (publishers.length === 0) return notify.error('Debes seleccionar almenos un medio')
    const share = getTotalShare(publishers)
    if (share < MAX_SHARE_VALUE) {
      return notify.error(`La sumatoria total del share entre todos los medios es de ${share}% y debe ser igual ${MAX_SHARE_VALUE}%`)
    }

    console.log({ restOfValues })

    const data = clearCampaign({ ...restOfValues, publishers })

    const summary = getSummaryInformation(values)

    const payload = { ...data, summary }

    mutateAsync({ id: _id, payload }).then(({ data }) => {
      if (data) {
        const hasAllFiles = data.publishers.some(({ imageUrl }) => !imageUrl)
        const path = hasAllFiles ? `/campaigns/${_id}/media` : '/campaigns'
        return navigate(path)
      }
    })
  }

  return (
    <CampaignPublisherForm
      initValues={globalCampaign}
      onSubmit={onSubmit}
      loading={isLoading}
    />
  )
}

export default CampaignPublisherPage
