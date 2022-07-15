import { IconButton, InputAdornment } from '@mui/material'
import Input from 'components/input'
import { forwardRef, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const PasswordInput = forwardRef(({ size = 'small', ...props }, ref) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(prev => !prev)
  }

  return (
    <Input
      fullWidth
      size={size}
      type={toggle ? 'text' : 'password'}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end' sx={{ display: 'flex' }}>
            <IconButton
              aria-label='toggle password visibility'
              edge='end'
              type='button'
              onClick={handleToggle}
              size='small'
            >
              {!toggle ? <VisibilityIcon fontSize='small' /> : <VisibilityOffIcon fontSize='small' />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
})

export default PasswordInput
