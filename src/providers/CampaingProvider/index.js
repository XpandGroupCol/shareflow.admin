import { useGetCampaignById } from 'hooks/useGetCampaignById'
import { useGetLists } from 'hooks/useGetLists'
import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { normalizeCampaign } from 'utils/normalizeData'

const CampaignContext = createContext()

const CampaignProvider = ({ children }) => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetCampaignById(id)
  const { data: lists, isLoading: loading } = useGetLists()

  const [globalCampaign, setGlobalCampaign] = useState(null)

  useEffect(() => {
    if (data?.data) {
      setGlobalCampaign({ ...normalizeCampaign(data?.data) })
    }
  }, [data?.data])

  return (
    <CampaignContext.Provider value={{
      id,
      globalCampaign,
      setGlobalCampaign,
      loading: isLoading || loading || !globalCampaign?._id,
      error: isError,
      lists
    }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export const useGlobalCampaigns = () => useContext(CampaignContext)

export default CampaignProvider
