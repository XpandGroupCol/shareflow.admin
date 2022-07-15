import { useGetUserById } from 'hooks/useGetUserById'
import { useParams } from 'react-router-dom'
import { ROLES } from 'configs/lists'
import EditAdminForm from 'components/users/edit/adminForm'
import EditClientForm from 'components/users/edit/clienteForm'
const EditUserPage = () => {
  const { id } = useParams()
  const { isLoading, isError, data } = useGetUserById(id)

  if (isLoading) return <h1>cargando...</h1>

  if (isError || !data) return <h1>error</h1>

  const { data: user } = data

  if (user?.role !== ROLES[4].value) return <EditAdminForm user={user} />

  return <EditClientForm user={user} />
}

export default EditUserPage
