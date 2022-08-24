
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread'
import Button from 'components/button'
import { GLOBAL_ERROR } from 'configs'
import { CAMPAINGS } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'
import { useMutation, useQueryClient } from 'react-query'
import { finishCampaign, rememberEmail, startCampaign } from 'services/campaigns'

const Buttons = ({ status, _id }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()

  const { mutateAsync: rememberEmailSync, isLoading: rememberLoading } = useMutation(rememberEmail)
  const { mutateAsync: startSync, isLoading: startLoading } = useMutation(startCampaign)
  const { mutateAsync: finishSync, isLoading: finishLoading } = useMutation(finishCampaign)

  const onRemember = () => {
    rememberEmailSync(_id)
      .then(() => {
        queryClient.invalidateQueries([CAMPAINGS])
        notify.success('El correo se ha enviado correctamente')
      })
      .catch(() => {
        notify.error(GLOBAL_ERROR)
      })
  }

  const onStart = () => {
    startSync(_id)
      .then(() => {
        queryClient.invalidateQueries([CAMPAINGS])
        notify.success('La campaña se ha eliminado correctamente')
      })
      .catch(() => {
        notify.error(GLOBAL_ERROR)
      })
  }

  const onFinish = () => {
    finishSync(_id)
      .then(() => {
        queryClient.invalidateQueries([CAMPAINGS])
        notify.success('La campaña se ha eliminado correctamente')
      })
      .catch(() => {
        notify.error(GLOBAL_ERROR)
      })
  }

  if (status === 'paid') {
    return (
      <Button color='success' variant='contained' size='small' sx={{ color: 'white' }} onClick={onStart} loading={startLoading}>
        Iniciar
      </Button>
    )
  }

  if (status === 'inProgress') {
    return (
      <Button color='error' variant='contained' size='small' loading={finishLoading} onClick={onFinish}>
        Finalizar
      </Button>
    )
  }

  if (status === 'draft' || status === 'pending') {
    return (
      <Button variant='outlined' size='small' loading={rememberLoading} onClick={onRemember}>
        <MarkAsUnreadIcon fontSize='small' sx={{ marginRight: '10px' }} />
        Completar
      </Button>

    )
  }

  return <></>
}

export default Buttons
