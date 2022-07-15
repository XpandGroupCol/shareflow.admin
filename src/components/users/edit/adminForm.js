import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Box } from '@mui/material'
import ControllerField from 'components/controllerField'
import Typography from 'components/typography'
import { adminDefaultValues, adminSchema } from './schema'
import Input from 'components/input'
import Button from 'components/button'
import styles from './form.module.css'
import Select from 'components/select'
import { ROLES } from 'configs/lists'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { editUser, uploadUserfile } from 'services/users'
import { useNotify } from 'hooks/useNotify'
import ChangeAvatar from 'components/changeAvatar'
import { useMutation, useQueryClient } from 'react-query'
import { USERS } from 'configs/queryKeys'

const EditAdminForm = ({ user }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: user ? { ...user } : { ...adminDefaultValues },
    resolver: yupResolver(adminSchema)
  })

  const navigation = useNavigate()
  const notify = useNotify()

  const [avatar, setAvatar] = useState(user?.avatar || { url: '', name: '' })

  const { isLoading, mutateAsync } = useMutation(editUser)

  const { isLoading: updatedIsLoading, mutateAsync: changeAvatar } = useMutation(uploadUserfile)
  const queryClient = useQueryClient()
  const onSubmit = async ({ email, name, lastName, password, role, _id }) => {
    const payload = { email, name, lastName, password, role, avatar }

    try {
      await mutateAsync({ id: _id, payload })
      queryClient.invalidateQueries([USERS])
      notify.success('El usuario se ha modificado exitosamente')
      navigation('/users')
    } catch (e) {
      notify.error('ups, algo salio mal por favor intente nuevamente')
    }
  }

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeAvatar(payload)
      if (!data) return notify.error('ups, algo salio mal por favor intente nuevamente')
      setAvatar(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error('ups, algo salio mal por favor intente nuevamente')
    }
  }

  const onDelete = () => {
    // aqui se debe llamar al back
    setAvatar({ url: '', name: '' })
  }

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Nuevo Usuario</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={avatar?.url || ''} label='Cambiar foto' loading={updatedIsLoading} />
        </Box>
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.rowFields}>
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
          </div>

          <ControllerField
            name='email'
            label='Correo electronico'
            size='normal'
            control={control}
            element={Input}
            disabled
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
          />
          <div className={styles.rowFields}>
            <ControllerField
              name='role'
              label='Rol'
              size='normal'
              control={control}
              element={Select}
              options={ROLES.slice(0, 4)}
              error={Boolean(errors?.role?.message)}
              helperText={errors?.role?.message}
            />
          </div>

          <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
            <Link to='/users'>
              <Button sx={{ minWidth: '200px' }} component='span' variant='outlined' type='button'>
                Cancelar
              </Button>
            </Link>
            <Button disabled={updatedIsLoading} loading={isLoading} sx={{ minWidth: '200px' }} variant='contained' type='submit'>
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default EditAdminForm
