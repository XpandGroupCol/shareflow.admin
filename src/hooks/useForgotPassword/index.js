import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { forgotPassword } from 'services/auth'
import { useNotify } from 'hooks/useNotify'
import { useNavigate } from 'react-router-dom'
export const useForgotPassword = (reset) => {
  const { mutateAsync, isLoading } = useMutation(forgotPassword, {
    onSuccess: () => { reset() }
  })
  const notify = useNotify()
  const navigation = useNavigate()

  const sendEmail = useCallback(async (payload) => {
    try {
      const { data } = await mutateAsync(payload)

      if (!data) return notify.error('Ups, algo salio mal')

      notify.success('Si haces parte de shareflow')
      navigation('/auth/sign-in')
    } catch ({ response }) {
      if (response?.data?.statusCode < 500) {
        return notify.success('Si haces parte de shareflow')
      }
      notify.error('Ups, algo salio mal')
    }
  }, [mutateAsync, notify, navigation])

  return {
    sendEmail,
    isLoading
  }
}
