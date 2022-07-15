export const resetFilters = (filters, queryParams) => {
  const reset = {}
  Object.entries(filters).forEach(([key, value]) => {
    if (!queryParams[key]) {
      reset[key] = null
    } else if (queryParams[key] !== value) {
      reset[key] = queryParams[key]
    }
  })

  return reset
}
