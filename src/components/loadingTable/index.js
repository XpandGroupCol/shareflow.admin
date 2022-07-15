import { Box, Skeleton } from '@mui/material'

const LoadingTable = ({ text = 'Cargando ...' }) => {
  return (
    <Box sx={{
      width: '100%',
      height: 'inherit',
      display: 'flex',
      padding: '0 40px',
      flexDirection: 'column'
    }}
    >
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
      <Skeleton sx={{ width: '100%', height: '60px' }} />
    </Box>
  )
}

export default LoadingTable
