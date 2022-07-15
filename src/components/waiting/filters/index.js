import { IconButton } from '@mui/material'
import InputSeach from 'components/inputSearch'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useDownloadCSV } from 'hooks/useDownloadCSV'
import { getCSVInvitations } from 'services/invitation'

const Filters = () => {
  const { download, loading } = useDownloadCSV(getCSVInvitations)

  return (
    <div className='filterSection'>
      <InputSeach placeholder='Buscar' />
      <div>
        <IconButton disabled={loading} onClick={download}>
          <FileDownloadIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Filters
