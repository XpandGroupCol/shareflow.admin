import styles from './drop.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { CircularProgress, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const UpdateFile = ({ file, onDelete, loading }) => {
  return (
    <div className={styles.file}>
      <div className={styles.text}>
        <PictureAsPdfIcon fontSize='large' />
        <a href={file?.url} target='blank'>
          {file.name}
        </a>
      </div>
      <div className={styles.buttons}>
        {loading
          ? <CircularProgress size={20} color='success' />
          : (
            <IconButton onClick={onDelete}>
              <CloseIcon fontSize='small' />
            </IconButton>)}
      </div>
    </div>
  )
}

export default UpdateFile
