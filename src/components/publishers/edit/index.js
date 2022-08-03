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

import { Fragment, useState } from 'react'
import CurrencyInput from 'components/currencyInput'
import Autocomplete from 'components/autocomplete'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, useQueryClient } from 'react-query'
import { PUBLISHERS } from 'configs/queryKeys'
import { useNotify } from 'hooks/useNotify'
import { editPublisher, uploadPublisherfile } from 'services/publishers'
import { normalizeFormats } from 'utils/publishersFormat'
import ChangeAvatar from 'components/changeAvatar'
import { GLOBAL_ERROR } from 'configs'

const EditPublisher = ({ publisher, ages, formats, targets }) => {
  const { formState: { errors }, handleSubmit, control } = useForm({
    defaultValues: publisher?._id ? { ...publisher } : { ...defaultValues },
    resolver: yupResolver(schema)
  })
  const queryClient = useQueryClient()
  const notify = useNotify()
  const navigation = useNavigate()

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

  const [logo, setLogo] = useState(publisher?.logo || { url: '', name: '' })

  const { isLoading, mutateAsync } = useMutation(editPublisher)

  const { isLoading: updatedIsLoading, mutateAsync: changeLogo } = useMutation(uploadPublisherfile)

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

  const onSubmit = async ({ ageRange, formats, ...values }) => {
    const payload = {
      ...values,
      ageRange: ageRange.map(({ value }) => value),
      formats: normalizeFormats(formats),
      logo
    }

    try {
      await mutateAsync({ id: publisher?._id, payload })
      queryClient.invalidateQueries([PUBLISHERS])
      notify.success('El publisher se ha editado exitosamente.')
      navigation('/publishers')
    } catch (e) {
      notify.success(GLOBAL_ERROR)
    }
  }

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeLogo({ payload, id: publisher?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setLogo(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
    }
  }

  const onDelete = async () => {
    try {
      const payload = { name: publisher?.rut?.name || '' }
      const { data } = await changeLogo({ payload, id: publisher?._id })
      if (!data) return notify.error(GLOBAL_ERROR)
      setLogo({ url: '', name: '' })
      notify.success('El rut se ha eliminado correctamente')
    } catch (e) {
      notify.error(GLOBAL_ERROR)
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
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={logo?.url || ''} label='Cambiar foto' loading={updatedIsLoading} />

        </Box>
        <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.rowFields}>
            <ControllerField
              name='publisher'
              label='Nombre'
              size='medium'
              control={control}
              element={Input}
              error={Boolean(errors?.publisher?.message)}
              helperText={errors?.publisher?.message}
            />
            <ControllerField
              name='miniBudget'
              label='Inversion minima'
              size='medium'
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
              size='medium'
              control={control}
              element={Select}
              options={SEX_LIST}
              error={Boolean(errors?.sex?.message)}
              helperText={errors?.sex?.message}
            />
            <ControllerField
              name='ageRange'
              label='Rango de edades'
              size='medium'
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
              size='medium'
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

export default EditPublisher
