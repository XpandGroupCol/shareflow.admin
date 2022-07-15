import { Navigate } from 'react-router-dom'
import { useSession } from 'providers/SessionProvider'

const PublicRoute = ({ children }) => {
  const { user } = useSession()

  if (user === undefined) return null

  if (user) return <Navigate to='/' />

  return children
}

export default PublicRoute
