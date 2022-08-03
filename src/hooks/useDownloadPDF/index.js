import { GLOBAL_ERROR } from 'configs'
import { useNotify } from 'hooks/useNotify'
import { useCallback, useState } from 'react'
import { downloadPDF } from 'services/campaigns'

export const useDownloadPDF = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const getPDF = useCallback(async (payload) => {
    try {
      setLoading(true)
      await downloadPDF(payload)
      setLoading(false)
    } catch ({ response }) {
      setLoading(false)
      notify.error(response?.data?.message || GLOBAL_ERROR)
    }
  }, [notify])

  return {
    getPDF,
    loading
  }
}
