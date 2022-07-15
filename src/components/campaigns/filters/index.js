import { IconButton } from '@mui/material'
import InputSeach from 'components/inputSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import FilterModal from './filterModal'
import { useState } from 'react'
import { useDownloadCSV } from 'hooks/useDownloadCSV'
import { getCSVCampaign } from 'services/campaigns'

const Filters = () => {
  const [filterModal, setFilterModal] = useState(false)

  const { download, loading } = useDownloadCSV(getCSVCampaign)

  const handleOpenFilters = () => {
    setFilterModal(prev => !prev)
  }

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar' />
      <div>
        <IconButton onClick={download} disabled={loading}>
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
