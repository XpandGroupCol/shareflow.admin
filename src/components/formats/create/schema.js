
import * as yup from 'yup'

export const defaultValues = {
  width: '',
  height: '',
  weight: '',
  isVideo: false,
  name: ''
}

export const schema = yup.object({
  width: yup.lazy((value) =>
    value === ''
      ? yup.string().required('Ancho es requerido')
      : yup.number()
        .typeError()
        .positive()
        .integer()
        .required()),
  height: yup.lazy((value) =>
    value === ''
      ? yup.string().required('Alto es requerido')
      : yup.number()
        .typeError()
        .positive()
        .integer()
        .required()),
  isVideo: yup.boolean(),
  weight: yup.lazy((value) =>
    value === ''
      ? yup.string().when('isVideo', {
        is: true,
        then: yup.string().required('Peso es requerido')
      })
      : yup.number()
        .when('isVideo', {
          is: true,
          then: yup.number().required('Peso es requerido')
        })
  ),
  name: yup.string().required('Nombre es requerido')
}).required()
