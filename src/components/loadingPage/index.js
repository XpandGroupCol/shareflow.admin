import { Box, LinearProgress } from '@mui/material'
import { LogoIcon } from 'assets/icons'
import Typography from 'components/typography'

const LoadingPage = ({ text = 'Sincronizando datos ...' }) => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'white',
      zIndex: 2000000
    }}
    >
      <Box sx={{
        width: '80%',
        maxWidth: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
      >
        <LogoIcon width={280} fill='#4b494f' />
        <Typography sx={{ marginBottom: '12px', marginTop: '8px' }}>{text}</Typography>
        <Box sx={{ width: '100%' }}>
          <LinearProgress sx={{ height: 10 }} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoadingPage
