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
import { AGES } from 'configs/queryKeys'

import { createAge } from 'services/ages'

const CreateForm = ({ open, onClose }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(createAge)

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
        queryClient.invalidateQueries([AGES])
        notify.success('La edad se ha creado correctamente')
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
      <DialogTitle fontWeight='bold'>Nueva Edad</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ padding: '20px 0' }} component='form' onSubmit={handleSubmit(onSubmit)}>
          <ControllerField
            name='name'
            label='Edad'
            control={control}
            element={Input}
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
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
