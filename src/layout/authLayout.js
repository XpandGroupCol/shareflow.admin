import Typography from 'components/typography'
import { LogoIcon } from 'assets/icons'
import styles from './auth.module.css'

const AuthLayout = ({ children, text }) => {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <picture>
          <LogoIcon width={250} />
        </picture>
        <Typography fontSize='18px' align='center'>Bienvenido nuevamente!</Typography>
        <Typography sx={{ marginBottom: '20px' }} fontSize='13px' align='center' fontWeight='300'>{text}</Typography>
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
