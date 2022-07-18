import { useNotify } from 'hooks/useNotify'
import { useCallback, useState } from 'react'
import { getPublishersByTarget } from 'services/campaigns'

const useGetPublishersByTarget = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const getPublushers = useCallback(async (target, miniBudget) => {
    try {
      setLoading(true)
      const { data: listOffPublishers, user } = await getPublishersByTarget(target, miniBudget)
      setLoading(false)
      return Promise.resolve({ listOffPublishers, percentage: user?.percentage || 15 })
    } catch (e) {
      setLoading(false)
      notify.error('Algo salio mal, por favor intenta nuevamente')
    }
  }, [notify])

  return {
    loading,
    getPublushers
  }
}

export default useGetPublishersByTarget
