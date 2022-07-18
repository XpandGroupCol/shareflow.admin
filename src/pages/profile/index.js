import { useGetProfile } from 'hooks/useGetProfile'
import ProfileForm from 'components/profileForm'
import LoadingPage from 'components/loadingPage'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const { data = {}, isLoading, isError } = useGetProfile()
  if (isLoading) return <LoadingPage text='Buscando perfil ...' />
  if (isError) {
    <Navigate to='/' />
    return
  }

  return <ProfileForm user={data?.data} />
}

export default Profile
