
import * as yup from 'yup'

export const defaultValues = {
  password: '',
  passwordConfirmation: ''
}

export const schema = yup.object({
  password: yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .max(15, 'La contraseña debe tener minimo 8 caracteres'),
  passwordConfirmation: yup.string()
    .required('Confirmar contraseña es requerida')
    .min(8, 'Confirmar contraseña debe tener minimo 8 caracteres')
    .max(15, 'Confirmar contraseña debe tener minimo 8 caracteres')

    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
}).required()
