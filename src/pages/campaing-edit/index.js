import CampaignProvider from 'providers/CampaingProvider'
import { Outlet } from 'react-router-dom'

const CampaignEditPage = () => {
  return (
    <CampaignProvider>
      <Outlet />
    </CampaignProvider>
  )
}

export default CampaignEditPage
