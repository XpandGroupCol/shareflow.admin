import { Box } from '@mui/material'
import BackButton from 'components/backButton'
import MediaForm from 'components/campaigns/media'
import LoadingPage from 'components/loadingPage'
import Typography from 'components/typography'
import { useEditGlobalCampaigns } from 'providers/EditCampaingProvider'
import { Navigate } from 'react-router-dom'

const EditMediaPage = () => {
  const { globalCampaign, loading, error } = useEditGlobalCampaigns()

  if (loading) return <LoadingPage text='Buscando multimedia ...' />

  if (error) return <Navigate to='/campaigns' />

  return (
    <>
      <section className='headerSection'>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
        >
          <BackButton href='/campaigns' />
          <Typography fontSize='24px' component='h2' fontWeight='bold'>Agregar multimedia</Typography>
        </Box>
      </section>
      <MediaForm campaign={globalCampaign} />
    </>
  )
}

export default EditMediaPage
