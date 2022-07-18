import { Box, Divider } from '@mui/material'
import Avatar from 'components/avatar'
import Button from 'components/button'
import OrderMedia from 'components/orderMedia'
import OrderTable from 'components/orderTable'
import StatusTag from 'components/statusTag'
import Typography from 'components/typography'
import { TAG_COLOR } from 'configs/campaigns'
import { Link } from 'react-router-dom'
import { parseDate } from 'utils/normalizeData'

const CampaignDetails = ({ campaing }) => {
  const localState = TAG_COLOR[campaing?.status] || {}
  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Detalle de la campaña</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Campaña:</Typography>
          <Typography>{campaing?.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Marca:</Typography>
          <Typography>{campaing?.brand}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Fechas</Typography>
          <Typography>{parseDate(campaing?.startDate)} - {parseDate(campaing?.endDate)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Estado:</Typography>
          {localState?.label ? <StatusTag label={localState?.label} color={localState?.color} /> : ''}
        </Box>
        <Box>
          <Avatar sx={{ width: 80, height: 80 }} src={campaing?.logo?.url || ''} label={campaing?.brand} />
        </Box>
        <Divider sx={{ margin: '20px 0' }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Segmentación de la campaña</Typography>
        <OrderTable
          data={campaing?.publishers || []}
          target={campaing?.target?.name}
          summary={campaing?.summary || {}}
        />
        <Box sx={{ margin: '30px 0' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Multimedia</Typography>
          <OrderMedia data={campaing?.publishers || []} />
        </Box>
        {campaing?.status === 'paid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to='/campaigns'>
              <Button component='span' variant='outlined'>
                Salir
              </Button>
            </Link>
            <Link to={`/campaigns/${campaing?._id}/edit`}>
              <Button component='span' variant='contained'>
                Editar Campaña
              </Button>
            </Link>
          </Box>)}
      </Box>
    </>
  )
}

export default CampaignDetails
