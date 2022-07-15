import { FORMATS } from 'configs/queryKeys'
import { useQuery } from 'react-query'
import { getFormats } from 'services/formats'

export const useGetFormats = (params) => {
  const { isError, isLoading, data, isRefetching } = useQuery([FORMATS, params], () => getFormats(params))

  return {
    isError,
    isLoading,
    data,
    isRefetching
  }
}
