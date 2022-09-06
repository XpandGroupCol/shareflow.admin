import { forwardRef } from 'react'
import MuiAutocomplete from '@mui/material/Autocomplete'
import Input from 'components/input'
import { renderlist } from './listItems'
import { Chip } from '@mui/material'
// import Typography from 'components/typography'

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
    // limitTags={1}
    // renderTags={(values) => {3
    //   if (values.length) {
    //     return (
    //       <Typography component='span'>
    //         {values.length > 1 ? 'Varios' : value[0].label}
    //       </Typography>
    //     )
    //   }
    //   return ''
    // }}
    renderTags={(value, getTagProps) =>
      value.map((option, index) => {
        return (
          <Chip key={option.value} variant='outlined' label={option?.label} {...getTagProps({ index })} />
        )
      })}
    {...props}
    renderInput={(params) =>
      <Input label={label} error={error} helperText={helperText} {...params} size={size} />}
    renderOption={multiple ? renderlist : undefined}
  />
))

export default Autocomplete
