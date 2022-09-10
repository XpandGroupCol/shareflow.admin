import * as yup from 'yup'

export const defaultValues = {
  email: '',
  name: '',
  lastName: '',
  password: '',
  role: ''
}

export const schema = yup.object({
  email: yup.string().required('Correo electronico es requerido').email('Ingrese un correo electronico valido'),
  name: yup.string().required('Nombres es requerido'),
  lastName: yup.string().required('Apellidos es requerido'),
  password: yup.string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener minimo 8 caracteres')
    .max(15, 'La contraseña debe tener maximo 15 caracteres'),
  role: yup.string().required('Rol es requerido')
}).required()
