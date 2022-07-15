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
import { TARGETS } from 'configs/queryKeys'
import { createTaget } from 'services/targets'
import Select from 'components/select'
import { TARGET_CATEGORIES } from 'configs/lists'

const CreateForm = ({ open, onClose }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(createTaget)

  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const handleOnClose = () => {
    reset()
    onClose()
  }

  const onSubmit = (values) => {
    mutateAsync(values)
      .then(() => {
        queryClient.invalidateQueries([TARGETS])
        notify.success('El objetivo se ha creado correctamente')
        handleOnClose()
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
      onClose={handleOnClose}
    >
      <DialogTitle fontWeight='bold'>Nuevo Objetivo</DialogTitle>
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
        <Button variant='outlined' onClick={handleOnClose}>Cancelar</Button>
        <Button loading={isLoading} variant='contained' onClick={handleSubmit(onSubmit)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateForm
