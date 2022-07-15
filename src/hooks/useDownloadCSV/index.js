import { useNotify } from 'hooks/useNotify'
import { useQueryParams } from 'providers/QueryParamsProvider'
import { useCallback, useState } from 'react'

export const useDownloadCSV = (fn) => {
  const { queryString } = useQueryParams()
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const download = useCallback(async () => {
    setLoading(true)
    notify.promise(fn(queryString), {
      pending: 'Descargando csv ...',
      success: {
        render () {
          setLoading(false)
          return 'El archivo se ha descargado correctamente'
        }
      },
      error: {
        render () {
          setLoading(false)
          return 'Ups, algo salio mal por favor vuelve a intentar'
        }
      }
    })
  }, [notify, queryString, fn])

  return {
    download,
    loading
  }
}
