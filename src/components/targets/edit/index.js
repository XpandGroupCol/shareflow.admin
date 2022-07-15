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
import { TARGETS } from 'configs/queryKeys'
import { updateTaget } from 'services/targets'
import { TARGET_CATEGORIES } from 'configs/lists'
import Select from 'components/select'

const EditForm = ({ open, onClose, item }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { queryString } = useQueryParams()
  const { mutateAsync, isLoading } = useMutation(updateTaget)

  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (open && item) {
      reset({ name: item?.name || '', category: item?.category || [] })
    }
  }, [open, item, reset])

  const onSubmit = (values) => {
    mutateAsync({
      payload: values,
      id: item._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [TARGETS, queryString], data)
        notify.success('El objetivo se ha creado correctamente')
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
      <DialogTitle fontWeight='bold'>Editar Objetivo</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }} component='form' onSubmit={handleSubmit(onSubmit)}>
          <ControllerField
            name='name'
            label='Objetivo'
            control={control}
            element={Input}
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
          />
          <ControllerField
            name='category'
            label='Categorias'
            control={control}
            element={Select}
            options={TARGET_CATEGORIES}
            multiple
            error={Boolean(errors?.category?.message)}
            helperText={errors?.category?.message}
          />
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
