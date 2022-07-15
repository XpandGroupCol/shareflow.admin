import { IconButton } from '@mui/material'
import InputSeach from 'components/inputSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import FilterModal from './filterModal'
import { useState } from 'react'
import { getCSVSector } from 'services/sectors'
import { useDownloadCSV } from 'hooks/useDownloadCSV'

const Filters = () => {
  const [filterModal, setFilterModal] = useState(false)

  const { download, loading } = useDownloadCSV(getCSVSector)

  const handleOpenFilters = () => {
    setFilterModal(prev => !prev)
  }

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar por sector' />
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
