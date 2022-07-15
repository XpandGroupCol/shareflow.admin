
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
        .min(1, 'Cero no es numero valido')
        .required()),
  height: yup.lazy((value) =>
    value === ''
      ? yup.string().required('Alto es requerido')
      : yup.number()
        .typeError()
        .positive()
        .integer()
        .min(1, 'Cero no es numero valido')
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
          then: yup.number()
            .typeError()
            .positive()
            .integer()
            .min(1, 'Cero no es numero valido')
        })
  ),
  name: yup.string().required('Nombre es requerido')
}).required()
