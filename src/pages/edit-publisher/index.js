import { useParams } from 'react-router-dom'
import { useGetPublisherById } from 'hooks/useGetPublisherById'
import { useGetLists } from 'hooks/useGetLists'
import EditPublisher from 'components/publishers/edit'

const EditPublisherPage = () => {
  const { id } = useParams()
  const { isLoading, isError, data } = useGetPublisherById(id)
  const { data: lists = {}, isLoading: listLoading } = useGetLists()
  const { ages = [], formats = [], targets = [] } = lists

  if (isLoading || listLoading) return <h1>cargando...</h1>

  if (isError || !data) return <h1>error</h1>

  const { data: publisher } = data

  console.log({ publisher })

  return <EditPublisher publisher={publisher} ages={ages} formats={formats} targets={targets} />
}

export default EditPublisherPage
