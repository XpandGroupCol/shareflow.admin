import { Box, Chip } from '@mui/material'
import Typography from 'components/typography'

const FilterChips = ({ value, onChange, options, label, name }) => {
  const handleOnChage = (value) => () => {
    onChange(name, value)
  }

  return (
    <div>
      <Typography fontSize='14px' fontWeight='bold' sx={{ marginBottom: '5px' }}>{label}</Typography>
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {
            options.map(({ label, value: v }) => {
              return (
                <Chip
                  key={label}
                  label={label}
                  onClick={handleOnChage(v)}
                  variant={value === v ? 'default' : 'outlined'}
                  sx={{ borderRadius: '8px' }}
                />
              )
            })
        }
      </Box>
    </div>
  )
}

export default FilterChips
