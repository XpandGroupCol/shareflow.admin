import { Box, IconButton, TableCell, TableRow } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import StatusTag from 'components/statusTag'
import Avatar from 'components/avatar'
import Typography from 'components/typography'
import { getSex, getAges, getFormatedNumber } from 'utils/normalizeData'
import { Link } from 'react-router-dom'
import { TAG_COLOR } from 'configs/campaigns'

const ItemRow = ({ item, onDelete }) => {
  const { brand, name, amount, logo, status, ages, sex, _id, user, userPercentage = 0 } = item
  const localState = TAG_COLOR[status] || {}
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar src={logo?.url || ''} label={name} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{name}</Typography>
            <Typography fontSize='12px' color='#4b494f'>{brand}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar src={user?.avatar?.url || ''} label={user?.name} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{user?.name}</Typography>
            <Typography fontSize='12px' color='#4b494f'>%{userPercentage}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align='center'>
        {getFormatedNumber(amount)}
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
          <Link to={`/campaigns/${_id}/view`}>
            <IconButton size='small' component='span'>
              <VisibilityIcon fontSize='small' />
            </IconButton>
          </Link>
          <Link to={`/campaigns/${_id}/edit`}>
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
