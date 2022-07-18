import { useGetProfile } from 'hooks/useGetProfile'
import ProfileForm from 'components/profileForm'

const Profile = () => {
  const { data = {}, isLoading, isError } = useGetProfile()

  if (isLoading) return <h1>Cargando ...</h1>
  if (isError) return <h1>Error</h1>

  return <ProfileForm user={data?.data} />
}

export default Profile
