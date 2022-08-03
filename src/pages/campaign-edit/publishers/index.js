import PublisherForm from 'components/campaigns/publishers'
import { MAX_SHARE_VALUE } from 'configs'
import { useNotify } from 'hooks/useNotify'

import { useEditGlobalCampaigns } from 'providers/EditCampaingProvider'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { updateCampaign as setCampaign } from 'services/campaigns'
import { clearCampaign, getSummaryInformation, getTotalShare } from 'utils/publishersFormat'

const PublishersEditPage = () => {
  const { globalCampaign, updateCampaign } = useEditGlobalCampaigns()

  const { mutateAsync, isLoading } = useMutation(setCampaign)

  const notify = useNotify()
  const navigate = useNavigate()

  const onSubmit = (values) => {
    const { publishers, _id, ...restOfValues } = values

    if (publishers.length === 0) return notify.error('Debes seleccionar almenos un medio')
    const share = getTotalShare(publishers)
    if (share < MAX_SHARE_VALUE) {
      return notify.error(`La sumatoria total del share entre todos los medios es de ${share}% y debe ser igual ${MAX_SHARE_VALUE}%`)
    }

    const data = clearCampaign({ ...restOfValues, publishers })

    const summary = getSummaryInformation(values)

    const payload = { ...data, summary }

    mutateAsync({ id: _id, payload }).then(({ data }) => {
      if (data) {
        const hasAllFiles = data.publishers.some(({ media }) => !media?.url)
        const path = hasAllFiles ? `/campaigns/${_id}/media` : '/campaigns'
        updateCampaign(prev => ({ ...prev, publishers: data?.publishers ?? [] }))
        return navigate(path)
      }
    })
  }

  const onBack = ({ publishers, rows }) => {
    updateCampaign(prev => ({ ...prev, publishers, rows }))
  }

  if (globalCampaign.listOffPublishers.length === 0) {
    return <Navigate to={`/campaigns/${globalCampaign?._id}/edit`} />
  }

  return (
    <PublisherForm
      initValues={globalCampaign}
      onBack={onBack}
      onSubmit={onSubmit} href={`/campaigns/${globalCampaign?._id}/edit`}
      loading={isLoading}
    />
  )
}

export default PublishersEditPage
