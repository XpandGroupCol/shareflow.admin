
import * as yup from 'yup'

export const defaultValues = {
  publisher: '',
  ageRange: [],
  sex: '',
  miniBudget: null,
  category: ''
}

export const schema = yup.object({
  publisher: yup.string().required('Publisher es requerido.'),
  ageRange: yup.array().min(1, 'Rango de edades es requerido.').required('Rango de edades es requerido.'),
  sex: yup.string().required('Sexo es requerido.').nullable(),
  category: yup.string().required('Sexo es requerido.').nullable(),
  miniBudget: yup.string().required('Inversion minima es requerido.').nullable(),
  formats: yup.array().of(
    yup.object({
      format: yup.object().required('Formato es requerido.').nullable(),
      target: yup.object().required('Objetivo es requerido.').nullable(),
      biddingModel: yup.string().required('Modelo es requerido.'),
      device: yup.string().required('Dispositivo es requerido.'),
      pricePerUnit: yup.string().required('Precio por unidad es requerido.').nullable()
    })
  ).min(1, 'Debes agregar minimo 1 formato')
}).required()
