import CampaignProvider from 'providers/EditCampaingProvider'
import { Outlet } from 'react-router-dom'

const EditPage = () => {
  return (
    <CampaignProvider>
      <Outlet />
    </CampaignProvider>

  )
}

export default EditPage
