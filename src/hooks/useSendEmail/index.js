import { INVITATION } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'
import { useQueryParams } from 'providers/QueryParamsProvider'
import { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'
import { sendEmail } from 'services/invitation'

export const useSendEmail = () => {
  const [loading, setLoading] = useState(null)
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { queryString } = useQueryParams()

  const send = useCallback(async (id) => {
    try {
      setLoading(id)
      const { data } = await sendEmail(id)
      setLoading(null)
      if (data) {
        notify.success('El email se ha enviado correctamente')
        queryClient.cancelQueries(INVITATION)
        queryClient.setQueriesData([INVITATION, queryString], (prev) => {
          if (prev.data) {
            const newData = prev.data.map((current) => {
              return current._id === id ? { ...current, sendEmail: true } : current
            })
            return { ...prev, data: newData }
          }
          return prev
        })
      } else {
        notify.error('Ups Algo salio mal')
      }
    } catch (e) {
      setLoading(null)
      notify.error('Ups Algo salio mal')
    }
  }, [notify, queryClient, queryString])

  return {
    loading,
    send
  }
}
