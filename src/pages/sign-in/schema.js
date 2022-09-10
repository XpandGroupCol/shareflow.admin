import * as yup from 'yup'

export const defaultValues = {
  email: '',
  password: ''
}

export const schema = yup.object({
  password: yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .max(15, 'La contraseña debe tener maximo 15 caracteres'),
  email: yup.string().email('Ingrese un correo válido').required('Correo electrónico es requerido')
}).required()
