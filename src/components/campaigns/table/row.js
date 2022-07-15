import { Box, IconButton, TableCell, TableRow } from '@mui/material'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import StatusTag from 'components/statusTag'
import Avatar from 'components/avatar'
import Typography from 'components/typography'
import { getSex, getAges } from 'utils/normalizeData'

const tagColor = {
  draft: {
    label: 'Borrador',
    color: 'default'
  },
  pending: {
    label: 'Pendiente',
    color: 'warning'
  },
  paid: {
    label: 'Pagada',
    color: 'success'
  },
  inProgress: {
    label: 'En progreso',
    color: 'success'
  },
  cancel: {
    label: 'Cancelada',
    color: 'error'
  },
  completed: {
    label: 'Completada',
    color: 'success'
  }
}

const ItemRow = ({ item, onDelete, onEdit }) => {
  const { brand, name, amount, logo, status, ages, sex } = item
  const localState = tagColor[status] || {}
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar src={logo} label={name} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{name}</Typography>
            <Typography fontSize='12px' color='#4b494f'>{brand}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align='center'>
        ${amount.toLocaleString()}
      </TableCell>
      <TableCell>
        {getSex(sex)}
      </TableCell>
      <TableCell>
        {getAges(ages)}
      </TableCell>
      <TableCell align='center'>
        {localState?.label ? <StatusTag label={localState?.label} color={localState?.color} /> : ''}
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
