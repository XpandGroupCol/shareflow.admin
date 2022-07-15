
import styles from './upload.module.css'
import Avatar from 'components/avatar'
import image from 'assets/no-image.png'
import Button from 'components/button'
import { CircularProgress, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const ChangeAvatar = ({ onEdit, onDelete, src, label, id = 'update-avatar', loading }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelte = () => {
    onDelete()
    handleClose()
  }

  const handleSetImage = ({ target }) => {
    const file = target.files[0]
    onEdit(file)
    handleClose()
  }

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadFilePicture}>
        <Avatar sx={{ width: 80, height: 80 }} src={src || image} label={label} />
        {loading && <span className={styles.progress}><CircularProgress /></span>}
      </div>
      <Button size='small' onClick={handleClick}>Actualizar</Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <MenuItem>
          <label htmlFor={id}>
            Cambiar foto
          </label>
          <input className={styles.inputFile} type='file' accept='image/*' id={id} onChange={handleSetImage} />
        </MenuItem>
        {src && <MenuItem onClick={handleDelte}>Eliminar</MenuItem>}
      </Menu>
    </div>
  )
}

export default ChangeAvatar
