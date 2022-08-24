import { Navigate, useLocation } from 'react-router-dom'
import { useSession } from 'providers/SessionProvider'
import Layout from 'layout'
import LoadingPage from 'components/loadingPage'
import { useMemo } from 'react'

const PrivateRoute = ({ children, access = [] }) => {
  const { user, loadingPage: loading } = useSession()

  const { pathname, search } = useLocation()

  const callbackUrl = useMemo(() =>
    pathname.includes('auth') ? '' : `?callback_url=${pathname}${search}`,
  [pathname, search])

  if (user === undefined || loading) return <LoadingPage />

  if (user === null) return <Navigate to={`/auth/sign-in${callbackUrl}`} />

  if (access.length && !access.includes(user?.role)) {
    return <Navigate to='/' />
  }

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default PrivateRoute
