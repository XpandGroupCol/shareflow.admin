import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Box } from '@mui/material'
import ControllerField from 'components/controllerField'
import Typography from 'components/typography'
import { defaultValues, schema } from './schema'
import Input from 'components/input'
import Button from 'components/button'
import styles from './form.module.css'
import Select from 'components/select'
import { ROLES } from 'configs/lists'
import PasswordInput from 'components/passwordInput'
import { Link, useNavigate } from 'react-router-dom'
import UploadFile from 'components/uploadAvatar'
import { useState } from 'react'
import { useMutate } from 'hooks/useMutate'
import { useQueryClient } from 'react-query'
import { createUser } from 'services/users'
import { USERS } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'

const CreateUserPage = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const navigation = useNavigate()
  const notify = useNotify()

  const [avatar, setAvatar] = useState(null)

  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutate(createUser)

  const onSubmit = async (values) => {
    const payload = new window.FormData()
    Object.entries(values).forEach(([key, value]) => {
      payload.append(key, value ?? '')
    })

    if (avatar?.image) {
      payload.append('file', avatar.image)
    }
    try {
      await mutateAsync(payload)
      queryClient.invalidateQueries([USERS])
      notify.success('El usuario se ha creado exitosamente.')
      navigation('/users')
    } catch (e) {
      notify.success('ups, algo salio mal por favor intente nuevamente')
    }
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
          <UploadFile onChange={setAvatar} value={avatar} label='Subir avatar' />
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
            <ControllerField
              name='password'
              label='Contaseña'
              size='normal'
              control={control}
              element={PasswordInput}
              error={Boolean(errors?.password?.message)}
              helperText={errors?.password?.message}
            />
          </div>

          <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
            <Link to='/users'>
              <Button sx={{ minWidth: '200px' }} component='span' variant='outlined' type='button'>
                Cancelar
              </Button>
            </Link>
            <Button loading={isLoading} sx={{ minWidth: '200px' }} variant='contained' type='submit'>
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateUserPage
