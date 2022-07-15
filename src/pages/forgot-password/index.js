import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AuthLayout from 'layout/authLayout'

import Button from 'components/button'
import ControllerField from 'components/controllerField'
import Input from 'components/input'
import ButtonLink from 'components/link'

import { useForgotPassword } from 'hooks/useForgotPassword'

import { defaultValues, schema } from './schema'

const ForgotPasswordPage = () => {
  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const {
    sendEmail,
    isLoading
  } = useForgotPassword(reset)

  return (
    <AuthLayout text='Ingrese su correo electrónico'>
      <form onSubmit={handleSubmit(sendEmail)}>
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
        </div>
        <div className='auth-link'>
          <ButtonLink to='/auth/sign-in'>
            Iniciar sesión
          </ButtonLink>
        </div>
        <Button
          fullWidth
          type='submit'
          loading={isLoading}
          variant='contained'
        >
          Enviar
        </Button>
      </form>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
