import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { changePassword } from 'services/auth'
import { useNotify } from 'hooks/useNotify'

export const useChangePassword = () => {
  const { mutateAsync, isLoading } = useMutation(changePassword)

  const notify = useNotify()

  const updatePassword = useCallback(async (payload) => {
    try {
      await mutateAsync(payload)
      notify.success('La contraseña se ha cambiado correctamente')
      return Promise.resolve(true)
    } catch ({ response }) {
      notify.error('Ups, algo salio mal')
    }
  }, [mutateAsync, notify])

  return {
    updatePassword,
    isLoading
  }
}
