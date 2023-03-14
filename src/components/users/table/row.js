import { Box, IconButton, TableCell, TableRow } from '@mui/material'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import StatusTag from 'components/statusTag'
import Typography from 'components/typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { Link } from 'react-router-dom'
import WhatsappButton from 'components/whatsappButton'
import Avatar from 'components/avatar'

const getFullName = (name, lastName) => `${name} ${lastName}`

const ItemRow = ({ item, onDelete }) => {
  const { name, status, email, avatar, lastName, emailVerified, company, companyEmail, phone, role, _id } = item

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar src={avatar?.url || ''} label={name} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{getFullName(name, lastName)}</Typography>
            <Typography fontSize='12px' color='#4b494f'>{email}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
          <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{company}</Typography>
          <Typography fontSize='13px' color='#4b494f'>{companyEmail}</Typography>
          {phone && <WhatsappButton number={phone} />}
        </Box>
      </TableCell>
      <TableCell>
        {role}
      </TableCell>
      <TableCell align='center'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
          {emailVerified ? <CheckCircleIcon sx={{ color: 'rgb(34, 154, 22)' }} /> : <WatchLaterIcon sx={{ color: '#f1c40f' }} />}
          <StatusTag label={status ? 'Activo' : 'Inactivo'} color={status ? 'success' : 'error'} />
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to={`/users/edit/${_id}`}>
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
