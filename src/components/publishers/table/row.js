import { Box, IconButton, TableCell, TableRow } from '@mui/material'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import StatusTag from 'components/statusTag'
import Avatar from 'components/avatar'
import Typography from 'components/typography'
import { getSex, getAges } from 'utils/normalizeData'
import { Link } from 'react-router-dom'

const ItemRow = ({ item, onDelete }) => {
  const { publisher, miniBudget, logo, status = false, formats, ageRange, sex, _id } = item
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar src={logo?.url} label={publisher} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{publisher}</Typography>
            <Typography fontSize='12px' color='#4b494f'>{miniBudget}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align='center'>
        {formats.length}
      </TableCell>
      <TableCell>
        {getSex(sex)}
      </TableCell>
      <TableCell>
        {getAges(ageRange)}
      </TableCell>
      <TableCell align='center'>
        <StatusTag label={status ? 'Activo' : 'Inactivo'} color={status ? 'success' : 'error'} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to={`/publishers/edit/${_id}`}>
            <IconButton size='small'>
              <ModeEditIcon fontSize='small' />
            </IconButton>
          </Link>
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
