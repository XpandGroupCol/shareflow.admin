import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider } from '@mui/material'
import Input from 'components/input'

import { useNotify } from 'hooks/useNotify'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryParams } from 'providers/QueryParamsProvider'
import { mutateLocalState } from 'utils/mutateLocalState'
import ControllerField from 'components/controllerField'
import { defaultValues, schema } from './schema'
import { useEffect } from 'react'
import { FORMATS } from 'configs/queryKeys'
import Checkbox from 'components/checkbox'
import { updateFormat } from 'services/formats'

const getEditValues = ({ name, width, height, isVideo, weight }) => ({
  name, width, height, isVideo, weight
})

const EditForm = ({ open, onClose, item }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { queryString } = useQueryParams()
  const { mutateAsync, isLoading } = useMutation(updateFormat)

  const { formState: { errors }, handleSubmit, control, reset, getValues, watch, setValue } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (open && item) {
      reset({ ...getEditValues(item) })
    }
  }, [open, item, reset])

  const onSubmit = ({ weight, ...values }) => {
    mutateAsync({
      payload: { ...values, weight: weight ?? 0 },
      id: item._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [FORMATS, queryString], data)
        notify.success('El objetivo se ha creado correctamente')
        onClose()
      })
      .catch(() => {
        notify.error('Ups, algo salio man')
      })
  }
  watch('isVideo')
  const values = getValues()

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
    >
      <DialogTitle fontWeight='bold'>Editar Objetivo</DialogTitle>
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
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Cancelar</Button>
        <Button loading={isLoading} variant='contained' onClick={handleSubmit(onSubmit)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditForm
