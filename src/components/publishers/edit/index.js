
import { Box } from '@mui/material'
import Typography from 'components/typography'

import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'
import { PUBLISHERS } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'
import { editPublisher, uploadPublisherfile } from 'services/publishers'
import { normalizeFormats } from 'utils/publishersFormat'
import ChangeAvatar from 'components/changeAvatar'
import { GLOBAL_ERROR } from 'configs'
import PublisherForm from '../form'

const EditPublisher = ({ publisher, ages, targets }) => {
  const queryClient = useQueryClient()
  const notify = useNotify()
  const navigation = useNavigate()

  const [logo, setLogo] = useState(publisher?.logo || { url: '', name: '' })

  const { isLoading, mutateAsync } = useMutation(editPublisher)

  const { isLoading: updatedIsLoading, mutateAsync: changeLogo } = useMutation(uploadPublisherfile)

  const onSubmit = async ({ ageRange, formats, locations, ...values }) => {
    const payload = {
      ...values,
      locations: locations.map(({ value }) => value),
      ageRange: ageRange.map(({ value }) => value),
      formats: normalizeFormats(formats),
      logo
    }

    if (!formats.length) return notify.error('Debes agregar almenos un formato.')

    try {
      await mutateAsync({ id: publisher?._id, payload })
      queryClient.invalidateQueries([PUBLISHERS])
      notify.success('El publisher se ha editado exitosamente.')
      navigation('/publishers')
    } catch (e) {
      notify.success(GLOBAL_ERROR)
    }
  }

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeLogo({ payload, id: publisher?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setLogo(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDelete = async () => {
    try {
      const payload = { name: publisher?.rut?.name || '' }
      const { data } = await changeLogo({ payload, id: publisher?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setLogo({ url: '', name: '' })
      notify.success('El rut se ha eliminado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Editar Publisher</Typography>
      </section>
      <Box sx={{
        width: '90%',
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={logo?.url || ''} label='Cambiar foto' loading={updatedIsLoading} />
        </Box>
        <PublisherForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          defaultValues={publisher}
          {...{ ages, targets }}
        />
      </Box>
    </>
  )
}

export default EditPublisher
