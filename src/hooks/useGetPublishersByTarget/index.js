
import { GLOBAL_ERROR } from 'configs'
import { useNotify } from 'hooks/useNotify'
import { useCallback, useState } from 'react'

import { getPublishersByTarget } from 'services/campaigns'

const setPayload = ({ ages, sex, amount, target }) => ({
  target: target?.value,
  ages: ages.map(({ value }) => value).join(','),
  amount,
  sex
}
)
export const useGetPublishersByTarget = () => {
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const getPublushers = useCallback(async (payload) => {
    try {
      setLoading(true)
      const filters = setPayload(payload)
      const { data: listOffPublishers, user } = await getPublishersByTarget(filters)
      setLoading(false)
      return Promise.resolve({ listOffPublishers, percentage: user?.percentage || 15 })
    } catch (e) {
      setLoading(false)
      notify.error(GLOBAL_ERROR)
    }
  }, [notify])

  return {
    loading,
    getPublushers
  }
}
