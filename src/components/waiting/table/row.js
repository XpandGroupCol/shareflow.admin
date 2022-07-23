import { Box, CircularProgress, IconButton, TableCell, TableRow } from '@mui/material'

import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread'
import Typography from 'components/typography'
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
        {phone}
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <IconButton size='small' onClick={onSend(item)}>
            {loading === item._id
              ? <CircularProgress size={16} />
              : (
                <Box>
                  <MarkAsUnreadIcon fontSize='small' color={sendEmail ? 'success' : 'initial'} /> {sendEmail ? <Typography fontSize='12px' color='#229a16'>Reenviar</Typography> : ''}
                </Box>)}
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
