import { IconButton } from '@mui/material'
import InputSeach from 'components/inputSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import FilterModal from './filterModal'
import { useState } from 'react'
import { useDownloadCSV } from 'hooks/useDownloadCSV'
import { getCSVUsers } from 'services/users'

const Filters = () => {
  const [filterModal, setFilterModal] = useState(false)

  const { download, loading } = useDownloadCSV(getCSVUsers)

  const handleOpenFilters = () => {
    setFilterModal(prev => !prev)
  }

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar por nombre, email' />
      <div>
        <IconButton disabled={loading} onClick={download}>
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
