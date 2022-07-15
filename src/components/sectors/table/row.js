import { Box, IconButton, TableCell, TableRow } from '@mui/material'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import StatusTag from 'components/statusTag'

const ItemRow = ({ item, onDelete, onEdit }) => {
  const { name, status } = item
  return (
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
      <TableCell align='center'>
        <StatusTag label={status ? 'Activo' : 'Inactivo'} color={status ? 'success' : 'error'} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <IconButton size='small' onClick={onEdit(item)}>
            <ModeEditIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small' onClick={onDelete(item)}
            color={status ? 'success' : 'error'}
          >
            {status
              ? <ToggleOffIcon fontSize='small' />
              : <ToggleOnIcon fontSize='small' />}
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
