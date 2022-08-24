import { Navigate, useSearchParams } from 'react-router-dom'
import { useSession } from 'providers/SessionProvider'

const PublicRoute = ({ children }) => {
  const { user } = useSession()

  const [searchParams] = useSearchParams()

  if (user === undefined) return null

  if (user) return <Navigate to={searchParams.get('callback_url') || '/'} />

  return children
}

export default PublicRoute
