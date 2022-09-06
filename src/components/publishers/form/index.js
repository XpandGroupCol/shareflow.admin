import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Box, Divider, IconButton } from '@mui/material'
import ControllerField from 'components/controllerField'
import Typography from 'components/typography'
import { schema } from './schema'
import Input from 'components/input'
import Button from 'components/button'
import styles from './form.module.css'
import Select from 'components/select'
import { BIDDING_MODEL, DEVICE, PUBLISHER_CATEGORY, SEX_LIST } from 'configs/lists'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import CurrencyInput from 'components/currencyInput'
import Autocomplete from 'components/autocomplete'
import CloseIcon from '@mui/icons-material/Close'

import AutocompleteFormats from 'components/autocompleteFormats'
import AutocompleteLocations from 'components/autocompleteLocations'

const PublisherForm = ({ defaultValues, onSubmit, isLoading, ages, targets }) => {
  console.log({ defaultValues })

  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  const { fields = [], append, remove } = useFieldArray({
    control,
    name: 'formats',
    defaultValues: [{
      format: null,
      target: null,
      pricePerUnit: '',
      biddingModel: '',
      device: ''
    }]
  })

  const handleAdded = () => {
    append({
      format: null,
      target: null,
      pricePerUnit: '',
      biddingModel: '',
      device: ''
    })
  }

  const handleRemove = (index) => () => {
    remove(index)
  }

  return (

    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.rowFields}>
        <ControllerField
          name='publisher'
          label='Nombre'
          size='normal'
          control={control}
          element={Input}
          error={Boolean(errors?.publisher?.message)}
          helperText={errors?.publisher?.message}
        />
        <ControllerField
          name='miniBudget'
          label='Inversion minima'
          size='normal'
          control={control}
          element={CurrencyInput}
          error={Boolean(errors?.miniBudget?.message)}
          helperText={errors?.miniBudget?.message}
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
      <div className={styles.rowFields}>

        <ControllerField
          name='category'
          label='Seleccione una categoria'
          size='normal'
          control={control}
          element={Select}
          options={PUBLISHER_CATEGORY}
          error={Boolean(errors?.category?.message)}
          helperText={errors?.category?.message}
        />
      </div>
      <div className={styles.rowFields}>
        <ControllerField
          name='sex'
          label='Sexo'
          size='normal'
          control={control}
          element={Select}
          options={SEX_LIST}
          error={Boolean(errors?.sex?.message)}
          helperText={errors?.sex?.message}
        />
        <ControllerField
          name='ageRange'
          label='Rango de edades'
          size='normal'
          control={control}
          element={Autocomplete}
          options={ages}
          multiple
          error={Boolean(errors?.ageRange?.message)}
          helperText={errors?.ageRange?.message}
        />

      </div>
      <Divider />
      <div className={styles.publisherTitle}>
        <Typography fontSize={20} fontWeight='bold'>Publishers</Typography>
        <Button onClick={handleAdded}>
          agregar
        </Button>

      </div>
      {
                 fields.map(({
                   id
                 }, index) => (
                   <Fragment key={id}>
                     <div className={styles.rowContainer}>
                       <div className={styles.tableRow}>
                         <div>
                           <ControllerField
                             name={`formats.${index}.format`}
                             label='Formato'
                             size='normal'
                             control={control}
                             element={AutocompleteFormats}
                             error={Boolean(errors?.locations?.message)}
                             helperText={errors?.locations?.message}
                           />
                         </div>

                         <div>
                           <ControllerField
                             name={`formats.${index}.target`}
                             label='Objetivo'
                             size='normal'
                             control={control}
                             element={Autocomplete}
                             options={targets}
                             error={Boolean(errors?.formats?.[index]?.target?.message)}
                             helperText={`${errors?.formats?.[index]?.target?.message || ''}`}
                           />
                         </div>

                         <div>
                           <ControllerField
                             name={`formats.${index}.biddingModel`}
                             label='Modelo'
                             size='normal'
                             control={control}
                             element={Select}
                             options={BIDDING_MODEL}
                             error={Boolean(errors?.formats?.[index]?.biddingModel?.message)}
                             helperText={`${errors?.formats?.[index]?.biddingModel?.message || ''}`}
                           />

                         </div>
                         <div>
                           <ControllerField
                             name={`formats.${index}.device`}
                             label='Dispositivos'
                             size='normal'
                             control={control}
                             element={Select}
                             options={DEVICE}
                             error={Boolean(errors?.formats?.[index]?.device?.message)}
                             helperText={`${errors?.formats?.[index]?.device?.message || ''}`}
                           />
                         </div>

                         <div>
                           <ControllerField
                             name={`formats.${index}.pricePerUnit`}
                             label='Precio unitario'
                             size='normal'
                             control={control}
                             element={CurrencyInput}
                             error={Boolean(errors?.formats?.[index]?.pricePerUnit?.message)}
                             helperText={`${errors?.formats?.[index]?.pricePerUnit?.message || ''}`}
                           />
                         </div>

                       </div>
                       <IconButton size='small' className={styles.deleteIcon} onClick={handleRemove(index)}>
                         <CloseIcon />
                       </IconButton>
                     </div>
                     <Divider />
                   </Fragment>
                 ))
}

      <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
        <Link to='/publishers'>
          <Button sx={{ minWidth: '200px' }} component='span' variant='outlined' type='button'>
            Cancelar
          </Button>
        </Link>
        <Button loading={isLoading} sx={{ minWidth: '200px' }} variant='contained' type='submit'>
          Guardar
        </Button>
      </Box>
    </Box>

  )
}

export default PublisherForm
