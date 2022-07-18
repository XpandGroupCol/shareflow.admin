import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider, Typography } from '@mui/material'
import ChangeAvatar from 'components/changeAvatar'
import { useNotify } from 'hooks/useNotify'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { uploadCampaignfile } from 'services/campaigns'
import { defaultValues, schema } from './schema'
import styles from './campaignForm.module.css'
import ControllerField from 'components/controllerField'
import Input from 'components/input'
import DatePicker from 'components/datePicker'
import { isBefore } from 'date-fns'
import Autocomplete from 'components/autocomplete'
import { SEX_LIST } from 'configs/lists'
import Select from 'components/select'
import CurrencyInput from 'components/currencyInput'
import { getFormatedNumber } from 'utils/normalizeData'
import { MIN_INVESTMENT } from 'configs'
import Button from 'components/button'
import useGetPublishersByTarget from 'hooks/useGetPublishersByTarget'

const CampaignEditForm = ({ campaign, ages, sectors, targets, updateCampaign }) => {
  const { formState: { errors }, handleSubmit, control, getValues, setValue, setError, clearErrors } = useForm({
    defaultValues: campaign?._id ? { ...campaign } : { ...defaultValues },
    resolver: yupResolver(schema)
  })

  console.log({ campaign })

  const navigate = useNavigate()
  const notify = useNotify()

  const { isLoading, mutateAsync: changeLogo } = useMutation(uploadCampaignfile)
  const { getPublushers, loading } = useGetPublishersByTarget()

  const [logo, setLogo] = useState(campaign?.logo || { url: '', name: '' })

  const values = getValues()

  const onEdit = async (file) => {
    try {
      const payload = new window.FormData()
      payload.append('file', file)
      const { data } = await changeLogo(payload)
      if (!data) return notify.error('ups, algo salio mal por favor intente nuevamente')
      setLogo(data)
      notify.success('La imagen se ha cambiado correctamente')
    } catch (e) {
      notify.error('ups, algo salio mal por favor intente nuevamente')
    }
  }

  const onDelete = () => {
    // aqui se debe llamar al back
    setLogo({ url: '', name: '' })
  }

  const onSubmit = (values) => {
    console.log({ values })

    const campaignState = campaign
    const { amount, target, listOffPublishers = [] } = campaignState
    const path = `/campaigns/${campaign?._id}/publishers`

    if (amount === values.amount && target?.value === values.target?.value && listOffPublishers?.length > 0) {
      updateCampaign(prev => ({ ...prev, ...values }))
      return navigate(path)
    }

    getPublushers(values.target?.value, values.amount).then(({ listOffPublishers, percentage }) => {
      let { rows, publishers } = campaignState
      let clearPublishers = false

      if (listOffPublishers?.length) {
        if (rows === undefined) {
          rows = listOffPublishers.filter(({ id }) => publishers.some(({ rowId }) => id === rowId))
        }

        console.log({ rows, listOffPublishers })

        if (amount !== values.amount || target?.value !== values.target?.value) {
          clearPublishers = true
        }

        updateCampaign(prev => ({
          ...prev,
          ...values,
          logo,
          listOffPublishers,
          rows: clearPublishers ? [] : prev.row ?? rows,
          publishers: clearPublishers ? [] : prev.publishers ?? [],
          userPercentage: percentage
        }))
        return navigate(path)
      }

      notify.info('No se encontraron medios para con el objetivo y el valor ingresa, por favor prueba modificaion estos campos.')
    })
  }

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
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Editar campaña</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        padding: '50px 25px',
        borderRadius: '8px'
      }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChangeAvatar onEdit={onEdit} onDelete={onDelete} src={logo?.url || ''} label='Cambiar foto' loading={isLoading} />
        </Box>
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
          {/* <ControllerField
            name='locations'
            label='Ubicaciones'
            control={control}
            size='normal'
            element={Autocomplete}
            options={[]}
            multiple
            error={Boolean(errors?.locations?.message)}
            helperText={errors?.locations?.message}
          /> */}

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
            element={Autocomplete}
            size='normal'
            options={sectors}
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
          />
          <div className={styles.buttons}>
            <Button loading={isLoading || loading} type='submit' variant='contained' color='primary' size='large' className={styles.button} disabled={disabledButton}>
              Continuar
            </Button>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default CampaignEditForm
