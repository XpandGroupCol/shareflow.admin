import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider, IconButton } from '@mui/material'
import FilterChips from 'components/filterChips'
import { useQueryParams } from 'providers/QueryParamsProvider'
import FilterListIcon from '@mui/icons-material/FilterList'
import { resetFilters } from 'utils/resetFilters'
import { CAMAPAING_STATUS } from 'configs/lists'

const FilterModal = ({ open, onClose }) => {
  const { queryParams, setQueryParams } = useQueryParams()
  const [filters, setFilters] = useState({
    status: queryParams?.status ?? null
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
    setFilters({ status: null })
    setQueryParams({ status: null })
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
          <form>
            <FilterChips name='status' label='Estado' options={CAMAPAING_STATUS} value={filters.status} onChange={handleOnChange} />
          </form>
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
