
import * as yup from 'yup'

export const defaultValues = {
  email: ''
}

export const schema = yup.object({
  email: yup.string()
    .email('Ingrese un correo valido.')
    .required('El correo electronico es requerido')
}).required()
