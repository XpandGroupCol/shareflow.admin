import { IconButton } from '@mui/material'
import InputSeach from 'components/inputSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import FilterModal from './filterModal'
import { useState } from 'react'
import { getCSVTargets } from 'services/targets'
import { useDownloadCSV } from 'hooks/useDownloadCSV'

const Filters = () => {
  const [filterModal, setFilterModal] = useState(false)

  const { download, loading } = useDownloadCSV(getCSVTargets)

  const handleOpenFilters = () => {
    setFilterModal(prev => !prev)
  }

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar por formato' />
      <div>
        <IconButton loading={loading} onClick={download}>
          <FileDownloadIcon />
        </IconButton>
        <FilterModal
          open={filterModal}
          onClose={handleOpenFilters}
        />
      </div>

    </div>
  )
}

export default Filters
