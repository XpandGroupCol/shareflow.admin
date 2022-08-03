import { Navigate, useParams } from 'react-router-dom'
import { useGetPublisherById } from 'hooks/useGetPublisherById'
import { useGetLists } from 'hooks/useGetLists'
import EditPublisher from 'components/publishers/edit'
import LoadingPage from 'components/loadingPage'

const EditPublisherPage = () => {
  const { id } = useParams()
  const { isLoading, isError, data } = useGetPublisherById(id)
  const { data: lists = {}, isLoading: listLoading } = useGetLists()
  const { ages = [], formats = [], targets = [] } = lists

  if (isLoading || listLoading) return <LoadingPage text='Buscando publisher ...' />

  if (isError || !data) return <Navigate to='/publishers' />

  const { data: publisher } = data

  return <EditPublisher publisher={publisher} ages={ages} formats={formats} targets={targets} />
}

export default EditPublisherPage
