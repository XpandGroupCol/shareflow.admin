import MUITextField from '@mui/material/TextField'
import { forwardRef } from 'react'

const Input = forwardRef(({ size = 'small', ...props }, ref) => {
  return (
    <MUITextField inputRef={ref} fullWidth size={size} {...props} />
  )
})

export default Input
