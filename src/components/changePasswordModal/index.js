import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider } from '@mui/material'

import Button from 'components/button'
import ControllerField from 'components/controllerField'

import { useNotify } from 'hooks/useNotify'

import { defaultValues, schema } from './schema'
import { changeProfilePassword } from 'services/profile'

import PasswordInput from 'components/passwordInput'

const ChangePasswordModal = ({ open, onClose }) => {
  const notify = useNotify()
  const { isLoading, mutateAsync } = useMutation(changeProfilePassword)

  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const handleOnClose = () => {
    reset()
    onClose()
  }

  const onSubmit = ({ password }) => {
    mutateAsync({ password })
      .then(() => {
        notify.success('La contraseña se ha cambiado correctamente')
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
      <DialogTitle fontWeight='bold' textAlign='center'>Cambiar contraseña</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }} component='form' onSubmit={handleSubmit(onSubmit)}>
          <ControllerField
            name='password'
            label='Contraseña'
            size='normal'
            control={control}
            element={PasswordInput}
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
          />
          <ControllerField
            name='passwordConfirmation'
            label='Confirmar contraseña'
            size='normal'
            control={control}
            element={PasswordInput}
            error={Boolean(errors?.passwordConfirmation?.message)}
            helperText={errors?.passwordConfirmation?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant='outlined' onClick={handleOnClose}>Cancelar</Button>
        <Button loading={isLoading} variant='contained' onClick={handleSubmit(onSubmit)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangePasswordModal
