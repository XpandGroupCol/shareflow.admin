
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSession } from 'providers/SessionProvider'
import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import Input from 'components/input'
import ButtonLink from 'components/link'
import ControllerField from 'components/controllerField'
import PasswordInput from 'components/passwordInput'

import { defaultValues, schema } from './schema'

const SignInPage = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { signIn, loading } = useSession()

  return (
    <AuthLayout text='Inicie sesión para continuar'>
      <form onSubmit={handleSubmit(signIn)}>
        <div className='auth-fields'>
          <ControllerField
            name='email'
            label='Correo electrónico'
            control={control}
            size='normal'
            element={Input}
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
          />
          <ControllerField
            name='password'
            label='Contraseña'
            size='normal'
            control={control}
            element={PasswordInput}
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
          />
        </div>
        <div className='auth-link'>
          <ButtonLink to='/auth/forgot-password'>
            Recuperar contraseña
          </ButtonLink>
        </div>
        <Button
          fullWidth
          variant='contained'
          loading={loading}
          type='submit'
        >
          Ingresar
        </Button>
      </form>
    </AuthLayout>
  )
}

export default SignInPage
