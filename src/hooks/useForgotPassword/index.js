import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { forgotPassword } from 'services/auth'
import { useNotify } from 'hooks/useNotify'
export const useForgotPassword = (reset) => {
  const { mutateAsync, isLoading } = useMutation(forgotPassword, {
    onSuccess: reset
  })
  const notify = useNotify()

  const sendEmail = useCallback(async (payload) => {
    try {
      await mutateAsync(payload)
      notify.success('Si haces parte de shareflow')
    } catch ({ response }) {
      if (response?.data?.statusCode < 500) {
        return notify.success('Si haces parte de shareflow')
      }
      notify.error('Ups, algo salio mal')
    }
  }, [mutateAsync, notify])

  return {
    sendEmail,
    isLoading
  }
}
