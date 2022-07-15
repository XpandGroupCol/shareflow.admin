import * as yup from 'yup'

export const defaultValues = {
  name: '',
  category: []

}

export const schema = yup.object({
  name: yup.string().required('Objetivo es requerido'),
  category: yup.array().min(1, 'Categoria es requerida')
}).required()
