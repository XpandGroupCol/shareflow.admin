import { useMemo, useState } from 'react'

import { useDropzone } from 'react-dropzone'
import styles from './drop.module.css'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { IconButton } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const UploadFile = ({ onChange }) => {
  const [files, setFiles] = useState([])
  const {
    getRootProps, getInputProps, isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({

    maxFiles: 1,
    accept: {
      'application/pdf': []
    },
    onDropAccepted: setFiles
  })

  const style = useMemo(() => ({
    ...(isFocused ? { borderColor: 'blue' } : {}),
    ...(isDragAccept ? { borderColor: 'green' } : {}),
    ...(isDragReject ? { borderColor: 'red' } : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ])

  const onDelete = () => {
    setFiles([])
  }

  const onUpload = () => {
    onChange(files[0] ?? null)
  }

  return (
    <div>
      {!files.length
        ? (
          <div className={styles.dropbox} {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Subir archivo</p>
          </div>)
        : files.map((file) => (
          <div key={file.path} className={styles.file}>
            <div className={styles.text}>
              <PictureAsPdfIcon />
              {file.path}
            </div>
            <div className={styles.buttons}>
              <IconButton onClick={onUpload}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UploadFile
