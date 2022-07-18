import { SEX_LIST } from 'configs/lists'
import { format } from 'date-fns'

export const getAges = (ageRange = []) => {
  return ageRange.map(({ name }) => name).join(' / ')
}

export const getSex = (sex) => {
  return SEX_LIST.find(({ value }) => value === sex)?.label ?? ''
}

export const getFormatedNumber = (number) => number ? `$${number.toLocaleString()}` : '$ 0'

export const parseDate = (date) => date ? format(new Date(date), 'dd/MM/yyyy') : ''

export const copyValues = (values) => JSON.parse(JSON.stringify(values))

export const getPublisherRow = ({ id, publisherId, label, device, formats, target, groupBy, ...restOfdata }) => ({
  publisherId,
  publisher: groupBy,
  rowId: id,
  label,
  device,
  share: '',
  value: '',
  objectiveGoal: '',
  formats,
  ...restOfdata
})

export const getSummaryInformation = ({ publishers, amount, userPercentage }) => {
  const _percentage = userPercentage ? parseFloat(userPercentage / 100) : 0
  const value = amount ? parseFloat(amount) : 0
  const serviceFee = value && _percentage ? value * _percentage : value
  const grossValue = value - serviceFee

  let medium = 0
  let platform = 0
  let prints = 0
  let reproductions = 0
  let clicks = 0

  publishers.forEach(({ biddingModel, publisherCategory, value, objectiveGoal }) => {
    const _value = parseFloat(value || 0)
    const _objetive = parseFloat(objectiveGoal || 0)

    if (publisherCategory === 'platform') {
      platform += _value
    } else {
      medium += _value
    }

    if (biddingModel === 'CPV') {
      reproductions += _objetive
    }

    if (biddingModel === 'CPM') {
      prints += _objetive
    }

    if (biddingModel === 'CPC' || biddingModel === 'CPA') { clicks += _objetive }
  })

  return {
    medium,
    platform,
    prints,
    reproductions,
    clicks,
    serviceFee,
    grossValue,
    currency: 'COP',
    discount: 0
  }
}

export const getTotalShare = (publishers) => publishers.reduce((acc, current) => acc + parseFloat(current.share), 0)

export const normalizeCampaign = ({ startDate, endDate, publishers, ...rest }) => ({
  ...rest,
  endDate: new Date(endDate),
  startDate: new Date(startDate),
  publishers: publishers?.map(({ publisherId, formatId, ...rest }) => ({ rowId: `${publisherId}-${formatId}`, publisherId, formatId, ...rest }))
})

export const clearPublishers = ({
  formatId,
  publisherId,
  objectiveGoal,
  pricePerUnit,
  biddingModel,
  device,
  publisher,
  label,
  publisherCategory,
  share,
  imageUrl,
  value,
  width,
  mimetype,
  height
}) => ({
  formatId,
  publisherId,
  objectiveGoal,
  pricePerUnit,
  biddingModel,
  device,
  label,
  publisherCategory,
  share,
  imageUrl,
  value,
  width,
  mimetype,
  publisher,
  height
})

export const clearCampaign = ({
  ages,
  locations,
  sector,
  sex,
  target,
  publishers,
  brand,
  name,
  startDate,
  endDate,
  amount,
  url,
  userPercentage,
  logo
}) => ({
  ages: ages?.map(({ value }) => value),
  locations: locations?.map(({ id }) => id),
  sector: sector?.value ?? '',
  sex,
  target: target?.value ?? '',
  publishers: publishers?.map(clearPublishers),
  brand,
  name,
  startDate,
  endDate,
  amount,
  url,
  userPercentage,
  logo
})
