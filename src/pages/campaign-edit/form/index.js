import { Box } from '@mui/material'
import BackButton from 'components/backButton'
import CampaignForm from 'components/campaigns/form'
import ChangeAvatar from 'components/changeAvatar'
import LoadingPage from 'components/loadingPage'
import Typography from 'components/typography'
import { GLOBAL_ERROR } from 'configs'
import { useGetLists } from 'hooks/useGetLists'
import { useGetPublishersByTarget } from 'hooks/useGetPublishersByTarget'
import { useNotify } from 'hooks/useNotify'
import { useEditGlobalCampaigns } from 'providers/EditCampaingProvider'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { uploadCampaignfile } from 'services/campaigns'

const CampaignEditFormPage = () => {
  const navigate = useNavigate()
  const notify = useNotify()
  const notifyRef = useRef()

  const { loading: loadingPublishers, getPublushers } = useGetPublishersByTarget()

  const { globalCampaign, setLogo, updateCampaign, error, loading } = useEditGlobalCampaigns()
  const { isLoading, mutateAsync: changeLogo } = useMutation(uploadCampaignfile)

  const { data } = useGetLists()

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeLogo({ payload, id: globalCampaign?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setLogo(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDelete = async () => {
    try {
      const payload = { name: globalCampaign?.logo?.name || '' }
      const { data } = await changeLogo({ payload, id: globalCampaign?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setLogo({ url: '', name: '' })
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onSubmit = ({ logo, ...values }) => {
    const { amount, target, listOffPublishers = [] } = globalCampaign
    const path = `/campaigns/${globalCampaign?._id}/publishers`

    if (amount === values.amount && target?.value === values.target?.value && listOffPublishers?.length > 0) {
      updateCampaign(prev => ({ ...prev, ...values }))
      return navigate(path)
    }

    getPublushers(values).then(({ listOffPublishers }) => {
      let { rows, publishers } = globalCampaign
      let clearPublishers = false

      if (listOffPublishers?.length) {
        if (rows === undefined) {
          rows = listOffPublishers.filter(({ id }) => publishers.some(({ rowId }) => id === rowId))
        }

        if (amount !== values.amount || target?.value !== values.target?.value) {
          clearPublishers = true
        }

        updateCampaign(prev => ({
          ...prev,
          ...values,
          listOffPublishers,
          rows: clearPublishers ? [] : prev.row ?? rows,
          publishers: clearPublishers ? [] : prev.publishers ?? []
        }))
        return navigate(path)
      }

      notify.info('No se encontraron medios para con el objetivo y el valor ingresa, por favor prueba modificaion estos campos.')
    })
  }

  if (loading) return <LoadingPage text='Buscando campaña ...' />
  if (error) {
    if (!notifyRef.current) {
      notifyRef.current = notify.error(GLOBAL_ERROR)
    }

    return <Navigate to='/campaigns' />
  }

  return (
    <>
      <section className='headerSection'>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
        >
          <BackButton href='/campaigns' />
          <Typography fontSize='24px' component='h2' fontWeight='bold'>Editar campaña</Typography>
        </Box>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={globalCampaign?.logo?.url || ''} label='Cambiar foto' loading={isLoading} />
        </Box>
        <CampaignForm
          loading={loadingPublishers}
          onSubmit={onSubmit}
          initValues={globalCampaign}
          {...data}
        />
      </Box>
    </>
  )
}

export default CampaignEditFormPage
