import { useGetUserById } from 'hooks/useGetUserById'
import { Navigate, useParams } from 'react-router-dom'
import { ROLES } from 'configs/lists'
import EditAdminForm from 'components/users/edit/adminForm'
import EditClientForm from 'components/users/edit/clienteForm'
import LoadingPage from 'components/loadingPage'
const EditUserPage = () => {
  const { id } = useParams()
  const { isLoading, isError, data } = useGetUserById(id)

  if (isLoading) return <LoadingPage text='Buscando usuario ...' />

  if (isError || !data) return <Navigate to='/users' />

  const { data: user } = data

  if (user?.role !== ROLES[4].value) return <EditAdminForm user={user} />

  return <EditClientForm user={user} />
}

export default EditUserPage
