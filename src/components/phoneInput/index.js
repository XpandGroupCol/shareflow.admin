import { Box } from '@mui/material'

import PhoneInputUI, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { forwardRef } from 'react'
import Input from 'components/input'

export const getNumber = (number) => {
  if (!number) return { prefix: '', local: '' }
  const international = formatPhoneNumberIntl(number)?.replaceAll(' ', '')
  const local = formatPhoneNumber(number)?.replaceAll(' ', '')
  const prefix = international.replaceAll(local, '')
  return { prefix, local }
}

const PhoneInput = forwardRef(({ onChange, value, onBlur, ...props }, ref) => {
  return (
    <Box sx={{
      width: '100%',
      '& .PhoneInputCountry': {
        display: 'none'
      }
    }}
    >
      <PhoneInputUI
        countrySelectProps={{ unicodeFlags: true }}
        international
        defaultCountry='CO'
        onChange={onChange}
        value={value}
        onBlur={({ target }) => {
          const number = target.value
          const error = formatPhoneNumber(number) ? !isValidPhoneNumber(number) : false

          onBlur(error)
        }}
        {...props}
        inputComponent={Input}
      />
    </Box>
  )
})

export default PhoneInput
