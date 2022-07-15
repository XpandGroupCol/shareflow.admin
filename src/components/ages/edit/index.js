import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider } from '@mui/material'

import { useQueryParams } from 'providers/QueryParamsProvider'
import Button from 'components/button'
import Input from 'components/input'
import ControllerField from 'components/controllerField'

import { useNotify } from 'hooks/useNotify'
import { updateAge } from 'services/ages'
import { mutateLocalState } from 'utils/mutateLocalState'

import { defaultValues, schema } from './schema'
import { AGES } from 'configs/queryKeys'

const EditForm = ({ open, onClose, item }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { queryString } = useQueryParams()
  const { mutateAsync, isLoading } = useMutation(updateAge)

  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (open && item) {
      reset({ name: item?.name || '' })
    }
  }, [open, item, reset])

  const onSubmit = (values) => {
    if (values.name === item.name) return notify.info('La edad es igual a la anterior')

    mutateAsync({
      payload: values,
      id: item._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [AGES, queryString], data)
        notify.success('La edad se ha actualizado correctamente')
        onClose()
      })
      .catch(() => {
        notify.error('Ups, algo salio man')
      })
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
    >
      <DialogTitle fontWeight='bold'>Editar Edad</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ padding: '20px 0' }} component='form' onSubmit={handleSubmit(onSubmit)}>
          <ControllerField
            name='name'
            label='Age'
            control={control}
            element={Input}
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Cancelar</Button>
        <Button
          type='submit'
          loading={isLoading}
          variant='contained'
          onClick={handleSubmit(onSubmit)}
        >Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditForm
