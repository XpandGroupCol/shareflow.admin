import { Box, CircularProgress, IconButton, TableCell, TableRow } from '@mui/material'

import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread'
const ItemRow = ({ item, onSend, loading }) => {
  const { name, phone, email } = item
  return (
    <TableRow>
      <TableCell>
        {name}
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
            {loading === item._id ? <CircularProgress size={16} /> : <MarkAsUnreadIcon fontSize='small' />}
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
