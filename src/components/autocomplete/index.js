import { forwardRef } from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'
import Input from 'components/input'
import { renderlist } from './listItems'
import Typography from 'components/typography'

const Autocomplete = forwardRef(({
  placeholder, options, label, multiple = false,
  value, onChange, error, helperText, size, ...props
}, ref) => (
  <MuiAutocomplete
    options={options}
    openOnFocus
    disableCloseOnSelect={multiple}
    onChange={(event, value) => onChange(value, event)}
    multiple={multiple}
    isOptionEqualToValue={(option, value) => {
      if (option.id) return option.id === value.id
      return option.value === value.value
    }}
    value={value}
    size={size}
    fullWidth
    limitTags={1}
    renderTags={(values) => {
      if (values.length) {
        return (
          <Typography component='span'>
            {values.length > 1 ? 'varios' : value[0].label}
          </Typography>
        )
      }
      return ''
    }}
    {...props}
    renderInput={(params) =>
      <Input label={label} error={error} helperText={helperText} {...params} size={size} />}
    renderOption={multiple ? renderlist : undefined}
  />
))

export default Autocomplete
