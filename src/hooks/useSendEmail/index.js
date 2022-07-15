import { useNotify } from 'hooks/useNotify'
import { useCallback, useState } from 'react'
import { sendEmail } from 'services/invitation'

export const useSendEmail = () => {
  const [loading, setLoading] = useState(null)
  const notify = useNotify()

  const send = useCallback(async (id) => {
    try {
      setLoading(id)
      const { data } = await sendEmail(id)
      setLoading(null)
      if (data) {
        notify.success('El email se ha enviado correctamente')
      } else {
        notify.error('Ups Algo salio mal')
      }
    } catch (e) {
      setLoading(null)
      notify.error('Ups Algo salio mal')
    }
  }, [notify])

  return {
    loading,
    send
  }
}
