import { Table, TableBody, TableContainer } from '@mui/material'

import TableHeader from 'components/tableHeader'
import { useQueryParams } from 'providers/QueryParamsProvider'
import LoadingTable from 'components/loadingTable'
import PageSection from 'components/pageSection'
import ItemRow from './row'
import { columns } from './colums'
import { useCallback, useState } from 'react'
import ConfirmationModal from 'components/confirmationModal'
import { useNotify } from 'hooks/useNotify'
import { useMutation, useQueryClient } from 'react-query'
import { mutateLocalState } from 'utils/mutateLocalState'
import { PUBLISHERS } from 'configs/queryKeys'
import { useGetPublishers } from 'hooks/useGetPublishers'
import { deletePublisher } from 'services/publishers'
import EmptyData from 'components/emptyData'
import ErrorRequest from 'components/errorRequest'

const ListTable = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetPublishers(queryString)
  const [modalDelete, setModalDelete] = useState(null)
  const { data: publishers = [], pages } = data

  const notify = useNotify()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loading } = useMutation(deletePublisher)

  const handleSubmit = (e) => {
    const toggleSector = !modalDelete.status
    e.preventDefault()
    mutateAsync({
      payload: { status: !modalDelete.status },
      id: modalDelete._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [PUBLISHERS, queryString], data)
        notify.success(`El sector se ha ${toggleSector ? 'activado' : 'desactivado'} correctamente`)
        setModalDelete()
      })
      .catch(() => {
        notify.error('Ups, algo salio man')
      })
  }

  const handleSetPage = (_, page) => {
    setQueryParams({ page })
  }

  const toggleModalDelete = useCallback((sector = null) => () => {
    setModalDelete(sector)
  }, [])

  if (isLoading) return <LoadingTable />

  if (isError) return <ErrorRequest />

  if (!publishers.length) return <EmptyData />

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader colums={columns} />
          <TableBody>
            {publishers.map((item) => (
              <ItemRow
                onDelete={toggleModalDelete}
                key={item._id}
                item={item}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PageSection
        page={queryParams?.page ?? 1}
        onChange={handleSetPage}
        count={pages}
      />
      <ConfirmationModal
        open={Boolean(modalDelete)}
        onClose={toggleModalDelete()}
        onSubmit={handleSubmit}
        loading={loading}
        condition={modalDelete?.status || false}
      />
    </>
  )
}

export default ListTable
