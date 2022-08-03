import { useGetCampaignById } from 'hooks/useGetCampaignById'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { normalizeCampaign } from 'utils/normalizeData'

const CampaignContext = createContext()

const CampaignProvider = ({ children }) => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetCampaignById(id)

  const [globalCampaign, setGlobalCampaign] = useState(null)

  useEffect(() => {
    if (data?.data) {
      setGlobalCampaign({ ...normalizeCampaign(data?.data) })
    }
  }, [data?.data])

  const setLogo = useCallback((logo) => {
    setGlobalCampaign(prev => ({ ...prev, logo }))
  }, [])

  return (
    <CampaignContext.Provider value={{
      id,
      globalCampaign,
      updateCampaign: setGlobalCampaign,
      loading: isError ? false : isLoading || !globalCampaign?._id,
      error: isError,
      setLogo
    }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export const useEditGlobalCampaigns = () => useContext(CampaignContext)

export default CampaignProvider
