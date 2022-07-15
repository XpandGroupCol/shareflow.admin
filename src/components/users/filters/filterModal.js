import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Divider, IconButton } from '@mui/material'
import FilterChips from 'components/filterChips'
import { useQueryParams } from 'providers/QueryParamsProvider'
import FilterListIcon from '@mui/icons-material/FilterList'
import { resetFilters } from 'utils/resetFilters'
import { ROLES } from 'configs/lists'

const options = [
  {
    label: 'Activo',
    value: '1'
  },
  {
    label: 'Inactivo',
    value: '0'
  }
]

const FilterModal = ({ open, onClose }) => {
  const { queryParams, setQueryParams } = useQueryParams()
  const [filters, setFilters] = useState({
    status: queryParams?.status ?? null,
    category: queryParams?.category ?? null
  })

  const handleOnChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleOnClose = () => {
    const reset = resetFilters(filters, queryParams)
    setFilters(prev => ({ ...prev, ...reset }))
    onClose()
  }

  const clearFilters = () => {
    setFilters({ status: null, role: null })
    setQueryParams({ status: null, role: null })
    onClose()
  }

  const onSubmitFilters = () => {
    setQueryParams({ page: 1, ...filters })
    onClose()
  }

  return (
    <>
      <IconButton
        onClick={onClose}
        color={filters.status === null ? 'default' : 'primary'}
      >
        <FilterListIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={open}
        onClose={handleOnClose}
        sx={{
          '&.MuiPaper-root': {
            backgroundColor: 'red'
          }
        }}
      >
        <DialogTitle fontWeight='bold'>Filtrar por</DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <FilterChips name='status' label='Estado' options={options} value={filters.status} onChange={handleOnChange} />
            <FilterChips name='role' label='role' options={ROLES} value={filters.role} onChange={handleOnChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={clearFilters}>Limpiar</Button>
          <Button variant='contained' onClick={onSubmitFilters}>Aplicar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FilterModal
