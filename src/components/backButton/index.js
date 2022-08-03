import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Link } from 'react-router-dom'

const BackButton = ({ href, onBack }) => {
  return (
    <Link to={href} onClick={onBack}>
      <IconButton component='span'>
        <ArrowBackIosNewIcon />
      </IconButton>
    </Link>
  )
}

export default BackButton
