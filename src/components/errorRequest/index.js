import { ErrorIcon } from 'assets/icons'
import Typography from 'components/typography'
import styles from './empty.module.css'

const ErrorRequest = () => {
  return (
    <div className={styles.data}>
      <div>
        <ErrorIcon width={200} height={200} />
        <Typography align='center' sx={{ fontSize: '18px', fontWeight: 'bold' }}>Ups, Algo salio mal por favor intentamente.</Typography>
      </div>
    </div>
  )
}

export default ErrorRequest
