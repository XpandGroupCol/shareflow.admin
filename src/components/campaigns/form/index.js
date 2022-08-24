import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import isBefore from 'date-fns/isBefore'

import { Box, Divider } from '@mui/material'
import Input from 'components/input'
import CurrencyInput from 'components/currencyInput'
import Autocomplete from 'components/autocomplete'
import DatePicker from 'components/datePicker'
import Button from 'components/button'
import Typography from 'components/typography'
import ControllerField from 'components/controllerField'

import { schema } from './schema'
import { MIN_INVESTMENT } from 'configs'
import styles from './campaignForm.module.css'
import { getFormatedNumber } from 'utils/normalizeData'
import { SEX_LIST } from 'configs/lists'
import Select from 'components/select'
import AutocompleteSectors from 'components/autocompleteSectors'
import AutocompleteLocations from 'components/autocompleteLocations'

const CampaignForm = ({ onSubmit, initValues, loading, ages = [], targets = [] }) => {
  const currencyRef = useRef(null)

  const { formState: { errors }, handleSubmit, control, getValues, setValue, setError, clearErrors } = useForm({
    defaultValues: { ...initValues },
    resolver: yupResolver(schema)
  })

  const values = getValues()

  const handleChangeStartDate = (date) => {
    if (values.endDate && isBefore(values.endDate, date)) {
      setValue('endDate', null, { shouldValidate: true })
    }
    setValue('startDate', date)
  }

  const handleValidateMinInvestment = ({ target }) => {
    const { value } = target

    const clearValue = parseFloat(value.replaceAll('.', '').replaceAll('-', ''))

    if (clearValue < MIN_INVESTMENT) {
      setError('amount', { type: 'min', message: `La inversion minima es de ${getFormatedNumber(MIN_INVESTMENT)} COP` })
    } else {
      clearErrors('amount')
    }
  }

  const disabledButton = Boolean(Object.keys(errors).length)

  return (
    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit(onSubmit)}>
      <ControllerField
        name='brand'
        label='Marca'
        placeholder='Ingresa el nombre de tu marca'
        control={control}
        element={Input}
        size='normal'
        error={Boolean(errors?.brand?.message)}
        helperText={errors?.brand?.message}
      />
      <ControllerField
        name='name'
        label='Campaña'
        placeholder='Ingresa el nombre de tu campaña'
        control={control}
        element={Input}
        size='normal'
        error={Boolean(errors?.name?.message)}
        helperText={errors?.name?.message}
      />

      <div className={styles.inputDates}>
        <ControllerField
          name='startDate'
          label='Fecha Inicio'
          control={control}
          element={DatePicker}
          minDate={new Date()}
          size='normal'
          error={Boolean(errors?.startDate?.message)}
          helperText={errors?.startDate?.message}
          onChange={handleChangeStartDate}
        />

        <ControllerField
          name='endDate'
          label='Fecha Final'
          control={control}
          element={DatePicker}
          size='normal'
          minDate={values.startDate || null}
          error={Boolean(errors?.endDate?.message)}
          helperText={errors?.endDate?.message}
        />
      </div>
      <ControllerField
        name='locations'
        label='Ubicaciones'
        control={control}
        size='normal'
        element={AutocompleteLocations}
        multiple
        error={Boolean(errors?.locations?.message)}
        helperText={errors?.locations?.message}
      />

      <ControllerField
        name='target'
        label='Objetivo Publicitario'
        control={control}
        element={Autocomplete}
        size='normal'
        options={targets}
        error={Boolean(errors?.target?.message)}
        helperText={errors?.target?.message}
      />

      <ControllerField
        name='sector'
        label='Sector Economico'
        control={control}
        element={AutocompleteSectors}
        size='normal'
        error={Boolean(errors?.sector?.message)}
        helperText={errors?.sector?.message}
      />

      <div className={styles.inputDates}>
        <ControllerField
          name='ages'
          label='Rangos de edad'
          control={control}
          element={Autocomplete}
          options={ages}
          size='normal'
          multiple
          error={Boolean(errors?.ages?.message)}
          helperText={errors?.ages?.message}
        />

        <ControllerField
          name='sex'
          label='Sexo'
          control={control}
          element={Select}
          options={SEX_LIST}
          size='normal'
          error={Boolean(errors?.sex?.message)}
          helperText={errors?.sex?.message}
        />
      </div>

      <ControllerField
        name='url'
        label='Url'
        placeholder='Ingrese la url ejemplo: hhtps://www...'
        control={control}
        element={Input}
        size='normal'
        error={Boolean(errors?.url?.message)}
        helperText={errors?.url?.message}
      />

      <Divider sx={{ width: '100%' }} />
      <Typography sx={{ width: '100%' }} fontSize='20px' fontWeight='bold' align='left'>Presupuesto Publicitario</Typography>
      <ControllerField
        name='amount'
        label='Presupuesto'
        control={control}
        element={CurrencyInput}
        size='normal'
        error={Boolean(errors?.amount?.message)}
        helperText={errors?.amount?.message || 'Ingresa el presupuesto que esperas invertir en esta campaña la inversion minima es de $ 1.000.000 COP'}
        onBlur={handleValidateMinInvestment}
        inputRef={currencyRef}
      />
      <div className={styles.buttons}>
        <Button loading={loading} type='submit' variant='contained' color='primary' size='large' className={styles.button} disabled={disabledButton}>
          Continuar
        </Button>
      </div>

    </Box>
  )
}

export default CampaignForm
