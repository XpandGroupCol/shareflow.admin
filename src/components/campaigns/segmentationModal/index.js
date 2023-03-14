import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider } from '@mui/material'
import { getSex } from 'utils/normalizeData'
import Typography from 'components/typography'

const SegmentationModal = ({ open, onClose, item }) => {
  const { sex = '', ages = [], locations = [], sector = {} } = item || {}

  return (

    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
      sx={{
        '&.MuiPaper-root': {
          backgroundColor: 'red'
        }
      }}
    >
      <DialogTitle fontWeight='bold'>Detalle de la segmentación</DialogTitle>
      <Divider />
      <DialogContent sx={{ marginBottom: '12px' }}>
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Sexo:</Typography>
          <Typography>{getSex(sex)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Sector: </Typography>
          <Typography>{sector?.name}</Typography>
        </Box>
        <Box sx={{ marginBottom: '8px' }}>
          <Typography fontSize='16px' fontWeight='bold'>Edades: </Typography>
          <Typography>{ages.map(({ name }) => name).join(', ')}</Typography>
        </Box>
        <Box>
          <Typography fontSize='16px' fontWeight='bold'>Ubicaciones: </Typography>
          <Typography>{locations.map(({ city, department }) => `${city}, ${department}`).join(' - ')}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SegmentationModal
