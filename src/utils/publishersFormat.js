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
  media,
  value,
  width,
  mimetype,
  height,
  logo,
  isVideo
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
  media,
  value,
  width,
  mimetype,
  publisher,
  height,
  logo,
  isVideo
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
  ages: ages.map(({ value }) => value),
  locations: locations.map(({ value }) => value),
  sector: sector?.value ?? '',
  sex,
  target: target?.value ?? '',
  publishers: publishers.map(clearPublishers),
  brand,
  name,
  startDate,
  endDate,
  amount,
  url,
  userPercentage,
  logo
})

export const copyValues = (values) => JSON.parse(JSON.stringify(values))

export const createPayload = (values) => {
  const payload = new window.FormData()

  Object.entries(clearCampaign(values)).forEach(([key, value]) => {
    if (key === 'ages' || key === 'locations') {
      value.forEach((v, i) => {
        payload.append(`${key}[${i}]`, v ?? '')
      })
      return
    }

    if (key === 'logo' && value?.image) {
      payload.append('file', value?.image)
      return
    }

    if (key === 'publishers') {
      value.forEach(({
        formatId,
        publisherId,
        objectiveGoal,
        pricePerUnit,
        biddingModel,
        device,
        label,
        publisherCategory,
        share,
        value,
        width,
        mimetype,
        height,
        publisher,
        isVideo,
        logo
      }, i) => {
        payload.append(`${key}[${i}][formatId]`, formatId ?? '')
        payload.append(`${key}[${i}][publisherId]`, publisherId ?? '')
        payload.append(`${key}[${i}][objectiveGoal]`, objectiveGoal ?? '')
        payload.append(`${key}[${i}][pricePerUnit]`, pricePerUnit ?? '')
        payload.append(`${key}[${i}][biddingModel]`, biddingModel ?? '')
        payload.append(`${key}[${i}][device]`, device ?? '')
        payload.append(`${key}[${i}][label]`, label ?? '')
        payload.append(`${key}[${i}][publisherCategory]`, publisherCategory ?? '')
        payload.append(`${key}[${i}][share]`, share ?? '')
        payload.append(`${key}[${i}][value]`, value ?? '')
        payload.append(`${key}[${i}][width]`, width ?? 0)
        payload.append(`${key}[${i}][height]`, height ?? '')
        payload.append(`${key}[${i}][mimetype]`, mimetype ?? '')
        payload.append(`${key}[${i}][media]`, '')
        payload.append(`${key}[${i}][publisher]`, publisher ?? '')
        payload.append(`${key}[${i}][isVideo]`, isVideo ?? false)
        payload.append(`${key}[${i}][logo][url]`, logo?.url ?? '')
        payload.append(`${key}[${i}][logo][name]`, logo?.name ?? '')
      })
      return
    }
    payload.append(key, value ?? '')
  })

  Object.entries(getSummaryInformation(values)).forEach(([key, value]) => {
    payload.append(`summary[${key}]`, value)
  })

  return payload
}

export const normalizeFormats = (data) => {
  return data.map(({
    format,
    target,
    pricePerUnit,
    biddingModel,
    device
  }) => {
    return {
      format: format?.value,
      target: target?.value,
      pricePerUnit,
      biddingModel,
      device
    }
  })
}
