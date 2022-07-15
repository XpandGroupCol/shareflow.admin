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
