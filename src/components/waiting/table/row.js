import { Box, CircularProgress, IconButton, TableCell, TableRow } from '@mui/material'

import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread'
import Typography from 'components/typography'
import Button from 'components/button'
import WhatsappButton from 'components/whatsappButton'

const ItemRow = ({ item, onSend, loading }) => {
  const { name, phone, email, lastName, sendEmail } = item
  return (
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {lastName}
      </TableCell>
      <TableCell>
        {email}
      </TableCell>
      <TableCell>
        <Box>
          <WhatsappButton number={phone} />
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>

          {loading === item._id
            ? <CircularProgress size={16} />
            : !sendEmail
                ? (
                  <IconButton size='small' onClick={onSend(item)}>
                    <MarkAsUnreadIcon fontSize='small' />
                  </IconButton>
                  )
                : (
                  <Button color='success' size='small' onClick={onSend(item)}>
                    <MarkAsUnreadIcon fontSize='small' sx={{ marginRight: '10px' }} />
                    <Typography fontSize='12px'>Reenviar</Typography>
                  </Button>
                  )}

        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
