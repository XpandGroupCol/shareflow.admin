import MUILink from '@mui/material/Link'
import { Link } from 'react-router-dom'

const ButtonLink = ({ to, children, ...props }) => {
  return (
    <Link to={to}>
      <MUILink
        variant='body2'
        component='span'
        sx={{ color: 'inherit', textDecoration: 'none' }}
        {...props}
      >
        {children}
      </MUILink>
    </Link>
  )
}

export default ButtonLink
