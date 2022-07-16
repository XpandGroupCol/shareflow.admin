import { NoFoundIcon } from 'assets/icons'
import Button from 'components/button'
import Typography from 'components/typography'
import { Link } from 'react-router-dom'
import styles from './notFound.module.css'

const NotFoundPage = () => {
  return (
    <main className={styles.notFound}>
      <NoFoundIcon />
      <Typography fontSize={24}>Parece que la pagina que buscas no existe!</Typography>
      <Link to='/'>
        <Button variant='outlined' component='span'>
          Volver al inicio
        </Button>
      </Link>
    </main>
  )
}

export default NotFoundPage
