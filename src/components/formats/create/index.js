import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider } from '@mui/material'

import Input from 'components/input'
import Button from 'components/button'
import ControllerField from 'components/controllerField'

import { useNotify } from 'hooks/useNotify'

import { defaultValues, schema } from './schema'
import { FORMATS } from 'configs/queryKeys'
import Checkbox from 'components/checkbox'
import { createFormat } from 'services/formats'

const CreateForm = ({ open, onClose }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(createFormat)

  const { formState: { errors }, handleSubmit, control, reset, watch, getValues, setValue } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  watch('isVideo')

  const handleOnClose = () => {
    reset()
    onClose()
  }

  const onSubmit = ({ weight, ...values }) => {
    mutateAsync({ ...values, weight: weight || 0 })
      .then(() => {
        queryClient.invalidateQueries([FORMATS])
        notify.success('El objetivo se ha creado correctamente')
        handleOnClose()
      })
      .catch(() => {
        notify.error('Ups, algo salio man')
      })
  }

  const values = getValues()

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={handleOnClose}
    >
      <DialogTitle fontWeight='bold'>Nuevo Formato</DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}
          component='form' onSubmit={handleSubmit(onSubmit)}
        >
          <ControllerField
            name='name'
            label='Formato'
            control={control}
            element={Input}
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
          />
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <ControllerField
              name='width'
              label='Ancho en PX'
              type='number'
              control={control}
              element={Input}
              error={Boolean(errors?.width?.message)}
              helperText={errors?.width?.message}
            />
            <ControllerField
              name='height'
              label='Alto en PX'
              type='number'
              control={control}
              element={Input}
              error={Boolean(errors?.height?.message)}
              helperText={errors?.height?.message}
            />
          </Box>
          <ControllerField
            name='isVideo'
            label='Es video?'
            control={control}
            element={Checkbox}
            onChange={({ target }) => {
              setValue('isVideo', target.checked)
              if (!target.checked) {
                setValue('weight', '')
              }
            }}
          />
          {values?.isVideo && (
            <ControllerField
              name='weight'
              label='Peso'
              type='number'
              control={control}
              element={Input}
              error={Boolean(errors?.weight?.message)}
              helperText={errors?.weight?.message}
            />)}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleOnClose}>Cancelar</Button>
        <Button loading={isLoading} variant='contained' onClick={handleSubmit(onSubmit)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateForm
