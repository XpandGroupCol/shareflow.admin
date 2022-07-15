import { IconButton } from '@mui/material'
import InputSeach from 'components/inputSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import FiltersModal from './filterModal'
import { useState } from 'react'
import { useDownloadCSV } from 'hooks/useDownloadCSV'
import { getCSVAges } from 'services/ages'

const Filters = () => {
  const [filterModal, setFilterModal] = useState(false)

  const { download, loading } = useDownloadCSV(getCSVAges)

  const handleOpenFilters = () => {
    setFilterModal(prev => !prev)
  }

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar por edad' />
      <div>
        <IconButton loading={loading} onClick={download}>
          <FileDownloadIcon />
        </IconButton>
        <FiltersModal
          open={filterModal}
          onClose={handleOpenFilters}
        />
      </div>

    </div>
  )
}

export default Filters
