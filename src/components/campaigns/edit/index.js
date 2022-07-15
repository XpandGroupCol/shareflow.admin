import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider } from '@mui/material'
import Input from 'components/input'
import { updateSector } from 'services/sectors'
import { useNotify } from 'hooks/useNotify'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryParams } from 'providers/QueryParamsProvider'
import { mutateLocalState } from 'utils/mutateLocalState'
import ControllerField from 'components/controllerField'
import { defaultValues, schema } from './schema'
import { useEffect } from 'react'
import { SECTORS } from 'configs/queryKeys'

const EditForm = ({ open, onClose, sector }) => {
  const notify = useNotify()
  const queryClient = useQueryClient()
  const { queryString } = useQueryParams()
  const { mutateAsync, isLoading } = useMutation(updateSector)

  const { formState: { errors }, handleSubmit, control, reset } = useForm({
    defaultValues: { ...defaultValues },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (open && sector) {
      reset({ name: sector?.name || '' })
    }
  }, [open, sector, reset])

  const onSubmit = (values) => {
    if (values.name === sector.name) return notify.info('El sector es igual a la anterior')
    mutateAsync({
      payload: values,
      id: sector._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [SECTORS, queryString], data)
        notify.success('El sector se ha creado correctamente')
        onClose()
      })
      .catch(() => {
        notify.error('Ups, algo salio man')
      })
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={onClose}
    >
      <DialogTitle fontWeight='bold'>Editar Sector</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ padding: '20px 0' }} component='form' onSubmit={handleSubmit(onSubmit)}>
          <ControllerField
            name='name'
            label='Sector'
            control={control}
            element={Input}
            error={Boolean(errors?.name?.message)}
            helperText={errors?.name?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>Cancelar</Button>
        <Button loading={isLoading} variant='contained' onClick={handleSubmit(onSubmit)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditForm
