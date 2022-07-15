import { Box, IconButton, TableCell, TableRow } from '@mui/material'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import StatusTag from 'components/statusTag'
import { TARGET_CATEGORIES } from 'configs/lists'

const getCategories = (category = []) => {
  const categories = []
  TARGET_CATEGORIES.forEach(({ value }) => {
    if (category.includes(value)) {
      categories.push(value)
    }
  })

  return categories.join(', ')
}

const ItemRow = ({ item, onDelete, onEdit }) => {
  const { name, status, category } = item
  return (
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {getCategories(category)}
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
