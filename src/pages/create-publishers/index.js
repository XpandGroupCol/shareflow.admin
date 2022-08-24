
import { Box } from '@mui/material'

import Typography from 'components/typography'

import { useNavigate } from 'react-router-dom'
import UploadFile from 'components/uploadAvatar'
import { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'
import { PUBLISHERS } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'
import { createPublisher } from 'services/publishers'
import { normalizeFormats } from 'utils/publishersFormat'
import PublisherForm from 'components/publishers/form'
import { useGetLists } from 'hooks/useGetLists'

const defaultValues = {
  publisher: '',
  ageRange: [],
  sex: '',
  miniBudget: null,
  category: ''
}

const CreatePublisherPage = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()
  const navigation = useNavigate()
  const { data = {} } = useGetLists()
  const { ages = [], targets = [] } = data

  const [logo, setLogo] = useState(null)

  const { isLoading, mutateAsync } = useMutation(createPublisher)

  const onSubmit = async (values) => {
    const payload = new window.FormData()

    const { formats } = values

    if (!formats.length) return notify.error('Debes agregar almenos un formato.')

    const _formats = normalizeFormats(formats)

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'ageRange') {
        value.forEach((v, i) => {
          payload.append(`${key}[${i}]`, v?.value ?? '')
        })
        return
      }

      if (key === 'formats') {
        _formats.forEach(({ format, target, pricePerUnit, biddingModel, device }, i) => {
          payload.append(`${key}[${i}][format]`, format ?? '')
          payload.append(`${key}[${i}][target]`, target ?? '')
          payload.append(`${key}[${i}][pricePerUnit]`, pricePerUnit ?? '')
          payload.append(`${key}[${i}][biddingModel]`, biddingModel ?? '')
          payload.append(`${key}[${i}][device]`, device ?? '')
        })
        return
      }

      payload.append(key, value ?? '')
    })

    if (logo?.image) {
      payload.append('file', logo.image)
    }

    try {
      await mutateAsync(payload)
      queryClient.invalidateQueries([PUBLISHERS])
      notify.success('El publisher se ha creado exitosamente.')
      navigation('/publishers')
    } catch (e) {
      notify.success('ups, algo salio mal por favor intente nuevamente')
    }
  }

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Nuevo Publisher</Typography>
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
          <UploadFile onChange={setLogo} value={logo} label='Subir logo' />
        </Box>
        <PublisherForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          {...{ ages, targets }}
        />
      </Box>
    </>
  )
}

export default CreatePublisherPage
