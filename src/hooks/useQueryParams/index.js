import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

const getQueryParams = (params, allowValues = []) => {
  let queries = {}
  params.forEach(function (value, key) {
    if (!allowValues.includes(key)) return
    queries = { ...queries, [key]: value }
  })
  return queries
}

const getStringParams = (params, allowValues = []) => {
  const queryParams = []
  params.forEach(function (value, key) {
    if (!allowValues.includes(key)) return
    queryParams.push(`${key}=${value}`)
  })
  const queryString = queryParams.join('&')
  return queryString ? `?${queryString}` : ''
}

export const useQueryParams = (allowValues = []) => {
  const [params, setParams] = useSearchParams()

  const setQueryParams = useCallback((filters) => {
    const queryParams = getQueryParams(params, allowValues)

    Object.entries(filters).forEach(([key, value]) => {
      if (value === '' || value === null) {
        delete queryParams[key]
        return
      }
      queryParams[key] = value
    })

    setParams(queryParams)
  }, [params, setParams, allowValues])

  const clearQueryParams = useCallback(() => setParams({}), [setParams])

  return {
    queryParams: getQueryParams(params, allowValues),
    setQueryParams,
    clearQueryParams,
    queryString: getStringParams(params, allowValues)
  }
}
