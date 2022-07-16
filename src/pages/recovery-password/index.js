import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import ButtonLink from 'components/link'
import ControllerField from 'components/controllerField'
import PasswordInput from 'components/passwordInput'
import LoadingPage from 'components/loadingPage'

import { useChangePassword } from 'hooks/useChangePassword'

import { recoveryPassword } from 'services/auth'
import { defaultValues, schema } from './schema'
import NotFoundPage from 'pages/not-found'

const RecoveryPasswordPage = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()
  const { token } = useParams()

  const { isLoading: loading, isError } = useQuery(['verify-token'], () => recoveryPassword({ token }))

  const {
    updatePassword,
    isLoading
  } = useChangePassword()

  const handleUpdatePassword = ({ password }) => {
    updatePassword({ password, token }).then((data) => {
      if (data) return navigate('/auth/sign-in')
    })
  }

  if (loading) return <LoadingPage text='Verificando los datos ...' />

  if (isError) return <NotFoundPage />

  return (
    <AuthLayout text='Cambia tu contraseña'>

      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className='auth-fields'>
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
        </div>
        <div className='auth-link'>
          <ButtonLink to='/auth/sign-in'>
            Iniciar sesión
          </ButtonLink>
        </div>
        <Button
          fullWidth
          variant='contained'
          loading={isLoading}
          type='submit'
        >
          Enviar
        </Button>
      </form>

    </AuthLayout>
  )
}

export default RecoveryPasswordPage
