import { SEX_LIST } from 'configs/lists'

export const getAges = (ageRange = []) => {
  return ageRange.map(({ name }) => name).join(' / ')
}

export const getSex = (sex) => {
  return SEX_LIST.find(({ value }) => value === sex)?.label ?? ''
}
