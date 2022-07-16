import { EmptyDataIcon } from 'assets/icons'
import Typography from 'components/typography'
import styles from './empty.module.css'

const EmptyData = () => {
  return (
    <div className={styles.data}>
      <div>
        <EmptyDataIcon width={200} height={200} />
        <Typography aling='center' sx={{ fontSize: '18px', fontWeight: 'bold' }}>No hay resultados</Typography>
      </div>
    </div>
  )
}

export default EmptyData
