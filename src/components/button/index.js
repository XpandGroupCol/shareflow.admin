import MUIButton from '@mui/material/Button'

const Button = ({ loading, disabled, children, ...props }) => {
  return (
    <MUIButton disabled={loading || disabled} disableElevation {...props}>
      {loading ? 'cargando...' : children}
    </MUIButton>
  )
}

export default Button
