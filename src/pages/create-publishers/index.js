import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Box, Divider, IconButton } from '@mui/material'
import ControllerField from 'components/controllerField'
import Typography from 'components/typography'
import { defaultValues, schema } from './schema'
import Input from 'components/input'
import Button from 'components/button'
import styles from './form.module.css'
import Select from 'components/select'
import { BIDDING_MODEL, DEVICE, PUBLISHER_CATEGORY, SEX_LIST } from 'configs/lists'
import { Link, useNavigate } from 'react-router-dom'
import UploadFile from 'components/uploadAvatar'
import { Fragment, useState } from 'react'
import CurrencyInput from 'components/currencyInput'
import Autocomplete from 'components/autocomplete'
import CloseIcon from '@mui/icons-material/Close'
import { useGetLists } from 'hooks/useGetLists'
import { useMutation, useQueryClient } from 'react-query'
import { PUBLISHERS } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'
import { createPublisher } from 'services/publishers'
import { normalizeFormats } from 'utils/publishersFormat'

const CreatePublisherPage = () => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })
  const queryClient = useQueryClient()
  const notify = useNotify()
  const navigation = useNavigate()
  const { data = {} } = useGetLists()
  const { ages = [], formats = [], targets = [] } = data
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

  const [logo, setLogo] = useState(null)

  const { isLoading, mutateAsync } = useMutation(createPublisher)

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

  const onSubmit = async (values) => {
    const payload = new window.FormData()

    const { formats } = values
    const _formats = normalizeFormats(formats)

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'ageRange') {
        value.forEach((v, i) => {
          payload.append(`${key}[${i}]`, v?.value ?? '')
        })
        return
      }

      if (key === 'formats') {
        _formats.forEach(({ format, target, pricePerUnit, biddingModel, device }, i) => {
          payload.append(`${key}[${i}][format]`, format ?? '')
          payload.append(`${key}[${i}][target]`, target ?? '')
          payload.append(`${key}[${i}][pricePerUnit]`, pricePerUnit ?? '')
          payload.append(`${key}[${i}][biddingModel]`, biddingModel ?? '')
          payload.append(`${key}[${i}][device]`, device ?? '')
        })
        return
      }

      payload.append(key, value ?? '')
    })

    if (logo?.image) {
      payload.append('file', logo.image)
    }

    try {
      await mutateAsync(payload)
      queryClient.invalidateQueries([PUBLISHERS])
      notify.success('El publisher se ha creado exitosamente.')
      navigation('/publishers')
    } catch (e) {
      notify.success('ups, algo salio mal por favor intente nuevamente')
    }
  }

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Nuevo Publisher</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <UploadFile onChange={setLogo} value={logo} label='Subir logo' />
        </Box>
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
                             element={Autocomplete}
                             options={formats}
                             error={Boolean(errors?.formats?.[index]?.format?.message)}
                             helperText={`${errors?.formats?.[index]?.format?.message || ''}`}
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
      </Box>
    </>
  )
}

export default CreatePublisherPage
