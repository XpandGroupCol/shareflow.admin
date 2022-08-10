import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from 'components/input'
import { defaultValues, schema, clearInitInformation } from './schema'
import { useState } from 'react'
import ControllerField from 'components/controllerField'
import Typography from 'components/typography'
import { Box, Divider } from '@mui/material'
import Button from 'components/button'
import StatusTag from 'components/statusTag'
import ChangePasswordModal from 'components/changePasswordModal'
import { useMutation } from 'react-query'
import { updateProfile } from 'services/profile'
import { useNotify } from 'hooks/useNotify'

import ChangeAvatar from 'components/changeAvatar'
import { uploadAvater } from 'services/users'
import { GLOBAL_ERROR } from 'configs'
import { useSession } from 'providers/SessionProvider'

const ProfileForm = ({ user }) => {
  const notify = useNotify()
  const [openModal, setOpenModal] = useState(false)
  const { setUSerSession } = useSession()

  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: user?._id ? clearInitInformation(user) : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const [avatar, setAvatar] = useState(user?.avatar || { url: '', name: '' })

  const { isLoading: submitLoading, mutateAsync } = useMutation(updateProfile)
  const { isLoading: updatedIsLoading, mutateAsync: changeAvatar } = useMutation(uploadAvater)

  const onSubmit = (values) => {
    mutateAsync({ ...values, avatar })
      .then(({ data }) => {
        setUSerSession(data)
        notify.success('El usuario se ha cambiado correctamente')
      })
      .catch(() => {
        notify.error(GLOBAL_ERROR)
      })
  }

  const handleOpenModal = (bool) => () => setOpenModal(bool)

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeAvatar({ payload, id: user?._id })

      if (!data) return notify.error(GLOBAL_ERROR)
      setUSerSession({ ...user, avatar: data })
      setAvatar(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDelete = async () => {
    try {
      const payload = { name: user?.avatar?.name || '' }
      const { data } = await changeAvatar({ payload, id: user?._id })

      if (!data) return notify.error(GLOBAL_ERROR)
      setUSerSession({ ...user, avatar: data })
      setAvatar({ url: '', name: '' })
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Perfil</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '500px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={avatar?.url || ''} label='Cambiar foto' loading={updatedIsLoading} />
          <Typography sx={{ marginTop: '10px' }} fontWeight='bold' fontSize='18px' lineHeight='1'>{user?.name} {user?.lastName}</Typography>
          <Typography fontSize='14px' sx={{ marginBottom: '10px' }}>{user?.email}</Typography>
          <StatusTag color='success' label={user.role} />
        </Box>
        <Divider sx={{ margin: '30px 0' }} />
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit(onSubmit)}>
          <ControllerField
            name='name'
            label='Nombre'
            size='normal'
            control={control}
            element={Input}
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
          />
          <ControllerField
            name='lastName'
            label='Apellido'
            size='normal'
            control={control}
            element={Input}
            error={Boolean(errors?.lastName?.message)}
            helperText={errors?.lastName?.message}
          />
          <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <Button disabled={updatedIsLoading} type='submit' sx={{ flex: 1 }} variant='contained' loading={submitLoading}>
              Actualizar
            </Button>
            <Button disabled={updatedIsLoading} sx={{ flex: 1 }} variant='outlined' type='button' onClick={handleOpenModal(true)}>
              Cambiar contraseña
            </Button>
          </Box>
        </Box>
      </Box>
      <ChangePasswordModal open={openModal} onClose={handleOpenModal(false)} />
    </>
  )
}

export default ProfileForm
