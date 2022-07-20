import { IconButton, Divider, Box } from '@mui/material'
import Autocomplete from 'components/autocomplete'
import Button from 'components/button'
import Typography from 'components/typography'
import SummaryCard from 'components/summaryCard'
import PublisherCard from 'components/publisherCard'
import styles from './form.module.css'

import ReceiptIcon from '@mui/icons-material/Receipt'
import { useState } from 'react'

import { useFieldArray, useForm } from 'react-hook-form'

import { useNotify } from 'hooks/useNotify'
import { copyValues, getPublisherRow, getSummaryInformation, getTotalShare } from 'utils/normalizeData'
import { yupResolver } from '@hookform/resolvers/yup'
import { publisherSchema } from './schema'
import { CPM_VALUE, MAX_SHARE_VALUE } from 'configs'
// import Modal from 'components/modal'

const CampaignPublisherForm = ({ initValues, onBack, onSubmit, href, loading }) => {
  const [rows, setRows] = useState(() => initValues?.rows ?? [])
  const [, setShowSummary] = useState(false)
  const notify = useNotify()

  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: { ...copyValues(initValues) },
    resolver: yupResolver(publisherSchema)
  })

  const { fields = [], remove, append, replace, update } = useFieldArray({
    control,
    name: 'publishers'
  })

  const formState = getValues()

  const cardInformation = getSummaryInformation(formState)

  const handleOnChangePublisher = (values) => {
    const valuesLength = values.length
    if (valuesLength === 0) {
      replace(copyValues(values))
      setRows(values)
      return
    }

    if (valuesLength > fields.length) {
      append(copyValues(getPublisherRow(values[valuesLength - 1])))
    } else {
      const indexRow = fields.findIndex(({ publisherId }) => !values.some(({ id }) => id === publisherId))
      remove(indexRow)
    }
    setRows(values)
  }

  const handleDeleteRow = (index, publisherId) => () => {
    setRows(prevValue => [...prevValue.filter(({ id }) => id !== publisherId)])
    remove(index)
  }

  const handleSetShare = (index) => ({ target }) => {
    const { publishers } = getValues()

    const currentRow = copyValues(publishers[index])
    const { biddingModel, pricePerUnit } = currentRow
    const currentShare = parseFloat(target.value)
    const totalShare = getTotalShare(publishers) - currentShare

    if (!target.value) {
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    if (currentShare < 1) {
      notify.info('El valor minimo es de 1%')
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    if (!totalShare && currentShare > MAX_SHARE_VALUE) {
      notify.info(`El valor maximo de share que puedes agregar por formato es: ${MAX_SHARE_VALUE}%`)
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    if (totalShare + currentShare > MAX_SHARE_VALUE) {
      notify.info(`El valor maximo de share que puedes agregar a este formato es: ${MAX_SHARE_VALUE - totalShare}%`)
      return update(index, {
        ...currentRow,
        value: 0,
        objectiveGoal: 0,
        share: ''
      })
    }

    const value = currentShare * cardInformation?.grossValue / 100
    const baseValue = value / pricePerUnit
    const objectiveGoal = parseInt(biddingModel !== 'CPM' ? baseValue : baseValue * CPM_VALUE, 10)

    return update(index, {
      ...currentRow,
      value,
      objectiveGoal
    })
  }

  // const handleOnBack = () => onBack({ publishers: formState?.publishers || [], rows })

  const disabledButton = Boolean(!formState?.publishers.length || Object.keys(errors).length)

  return (
    <>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Objetivo y Presupuesto</Typography>
      </section>

      <Box sx={{
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
      >
        <section className={styles.publishers}>
          <div className={styles.media}>
            <section className={styles.newCampaignHeader}>
              {/* <BackButton href={href} onBack={handleOnBack} /> */}
            </section>
            <div className={styles.filters}>
              <Autocomplete
                id='combo-box-demo'
                options={initValues?.listOffPublishers || []}
                fullWidth
                label='Medios'
                multiple
                size='smaill'
                groupBy={(option) => option.groupBy}
                value={rows}
                onChange={handleOnChangePublisher}
              />
            </div>
            <Divider sx={{ width: '100%', marginBottom: '20px' }} />
            <Typography fontSize='14px' align='center' sx={{ marginBottom: '24px' }}>Segmentación inicial para la campaña</Typography>
            {!fields.length && <Typography fontSize='12px' align='center' sx={{ color: '#5b595f', margin: '30px 0' }}>Ningun medio seleccionado</Typography>}
            <form className={styles.form}>
              {fields.map((publisher, index) => (
                <PublisherCard
                  key={publisher.id}
                  name={`publishers.${index}.share`}
                  deleteRow={handleDeleteRow(index, publisher?.rowId)}
                  onBlur={handleSetShare(index)}
                  control={control}
                  error={Boolean(errors?.publishers && errors?.publishers[index]?.share?.message)}
                  helperText={errors?.publishers && errors?.publishers[index]?.share?.message}
                  {...publisher}
                />
              ))}
              <Divider sx={{ width: '100%', marginBottom: '20px' }} />
              <div className={styles.buttonContainer}>
                <Button size='large' disabled={disabledButton} variant='contained' onClick={handleSubmit(onSubmit)} loading={loading}>Guardar campaña</Button>
              </div>
            </form>
          </div>
          <div className={styles.summary}>
            <SummaryCard
              campaign={initValues}
              {...cardInformation}
            />
          </div>
          <div className={styles.buttonInvoice}>
            <IconButton
              onClick={() => setShowSummary(true)}
              size='large' sx={{
                position: 'fixed',
                background: '#5b27ed',
                bottom: '30px',
                zIndex: 100,
                right: '30px',
                boxShadow: '0 4px 12px rgb(0 0 0 / 10%)',
                '&:hover': {
                  background: '#5327d1'
                }
              }}
            >
              <ReceiptIcon fontSize='large' sx={{ color: 'white' }} />
            </IconButton>
          </div>
          {/* <Modal
        open={showSummary}
        onClose={() => setShowSummary(false)}
      >
        <div className={styles.summaryModal}>
          <SummaryCard
            campaign={initValues}
            {...cardInformation}
          />
        </div>
      </Modal> */}
        </section>
      </Box>
    </>
  )
}

export default CampaignPublisherForm
