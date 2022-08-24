import Button from 'components/button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider } from '@mui/material'

import Typography from 'components/typography'

const ConfirmationModal = ({ open, onClose, onSubmit, loading, condition, text = '' }) => {
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
      <DialogTitle fontWeight='bold'>Confirmación</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography sx={{ padding: '20px 0' }}>
          {text || `Estas seguro que deseas ${!condition ? 'activar' : 'desactivar'} el registro ?`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Cancelar</Button>
        <Button loading={loading} variant='contained' onClick={onSubmit}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationModal
