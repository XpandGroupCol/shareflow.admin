import * as yup from 'yup'

export const defaultValues = {
  name: '',
  lastName: ''
}

export const schema = yup.object({
  name: yup.string().required('Nombre es requerido'),
  lastName: yup.string().required('Apellido es requerido')
}).required()

export const clearInitInformation = ({ name = '', lastName = '' }) => ({
  name, lastName
})
