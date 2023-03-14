import { Box, Button, IconButton, Menu, MenuItem, TableCell, TableRow } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import StatusTag from 'components/statusTag'
import Avatar from 'components/avatar'
import Typography from 'components/typography'
import { getFormatedNumber } from 'utils/normalizeData'
import { Link } from 'react-router-dom'
import { TAG_COLOR } from 'configs/campaigns'

import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import Buttons from './buttons'
import { transformOrderNumber } from 'utils/publishersFormat'

import WhatsappButton from 'components/whatsappButton'

const ItemRow = ({ item, onDelete, onDetail }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { brand, name, amount, logo, status, _id, user, userPercentage = 0, orderNumber = 0 } = item
  const localState = TAG_COLOR[status] || {}
  return (
    <TableRow>
      <TableCell>
        {transformOrderNumber(orderNumber)}
      </TableCell>
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
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Avatar src={user?.avatar?.url || ''} label={user?.name} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Link to={`/users/edit/${user?._id}`}>
              <Typography fontWeight='bold' fontSize='0.875rem' color='#4b494f'>{user?.name}</Typography>
            </Link>
            {user?.phone && (
              <WhatsappButton number={user?.phone} />
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell align='right'>
        <Typography sx={{ fontSize: 'inherit' }} fontWeight='bold'>${getFormatedNumber(amount)}</Typography>
        <Typography fontSize='13px' color='#4b494f'>%{userPercentage}</Typography>
      </TableCell>
      <TableCell align='center'>
        <Button variant='outlined' size='small' onClick={onDetail(item)}>
          <VisibilityIcon fontSize='small' sx={{ marginRight: '10px' }} />
          segmentación
        </Button>
      </TableCell>
      <TableCell align='center'>
        {localState?.label ? <StatusTag label={localState?.label} color={localState?.color} /> : ''}
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Buttons {...item} />
          <IconButton size='small' component='span' onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              '& .MuiPaper-root': {
                boxShadow: 'rgb(0 0 0 / 10%) 0px 4px 12px'
              }
            }}
          >

            <Link to={`/campaigns/${_id}/view`}>
              <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: '14px' }}>
                <IconButton size='small' component='span' sx={{ marginRight: '10px' }}>
                  <VisibilityIcon fontSize='small' />
                </IconButton>
                Ver
              </MenuItem>
            </Link>

            {!['draft', 'pending', 'completed'].includes(status) && (
              <Link to={`/campaigns/${_id}/edit`}>
                <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: '14px' }}>
                  <IconButton component='span' size='small' sx={{ marginRight: '10px' }}>
                    <ModeEditIcon fontSize='small' />
                  </IconButton>
                  Editar
                </MenuItem>
              </Link>
            )}

            {['draft', 'pending', 'cancel'].includes(status) &&
            (
              <MenuItem
                onClick={() => {
                  handleClose()
                  onDelete(item)
                }} disableRipple
                sx={{ fontSize: '14px' }}
              >
                <Link to={`/campaigns/${_id}/edit`}>
                  <IconButton size='small' sx={{ marginRight: '10px' }}>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </Link>
                Eliminar
              </MenuItem>)}
          </Menu>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
