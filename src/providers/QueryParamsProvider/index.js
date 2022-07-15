import { createContext, useCallback, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'

const QueryParamsContext = createContext()

const getQueryParams = (params, allowValues = []) => {
  let queries = { page: 1 }
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
  return queryString ? `?${queryString}` : '?page=1'
}

const QueryParamsProvider = ({ children, allowValues }) => {
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

  return (
    <QueryParamsContext.Provider value={{
      queryParams: getQueryParams(params, allowValues),
      setQueryParams,
      clearQueryParams,
      queryString: getStringParams(params, allowValues)

    }}
    >
      {children}
    </QueryParamsContext.Provider>
  )
}

export const useQueryParams = () => useContext(QueryParamsContext)

export default QueryParamsProvider
