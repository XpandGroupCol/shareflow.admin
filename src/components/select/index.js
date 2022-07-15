import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'
import { forwardRef } from 'react'

const Select = forwardRef(({ size = 'small', label, options = [], multiple = false, helperText, error, ...props }, ref) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
      <MuiSelect
        labelId='demo-multiple-name-label'
        id='demo-multiple-name'
        multiple={multiple}
        error={error}
        size={size}
        label={label}
        renderValue={(selected) => {
          if (multiple) {
            if (!selected.length) return 'Seleccione una opción'

            if (selected.length === 1) return options.find(({ value }) => value === selected[0])?.label || ''

            return 'varios seleccionados'
          }

          return options.find(({ value }) => value === selected)?.label || ''
        }}
        {...props}
      >
        {options.map(({ label, value }) => (
          <MenuItem
            key={value}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
})

export default Select
