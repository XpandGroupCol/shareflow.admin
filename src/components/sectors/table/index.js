import { Table, TableBody, TableContainer } from '@mui/material'
import { useGetSectors } from 'hooks/useGetSectors'

import TableHeader from 'components/tableHeader'
import { useQueryParams } from 'providers/QueryParamsProvider'
import LoadingTable from 'components/loadingTable'
import PageSection from 'components/pageSection'
import ItemRow from './row'
import { columns } from './colums'
import EditForm from '../edit'
import { useCallback, useState } from 'react'
import ConfirmationModal from 'components/confirmationModal'
import { useNotify } from 'hooks/useNotify'
import { useMutation, useQueryClient } from 'react-query'
import { deleteSector } from 'services/sectors'
import { mutateLocalState } from 'utils/mutateLocalState'
import { SECTORS } from 'configs/queryKeys'

const ListTable = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetSectors(queryString)
  const [modalEdit, setModalEdit] = useState(null)
  const [modalDelete, setModalDelete] = useState(null)
  const { data: sectors = [], pages } = data

  const notify = useNotify()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loading } = useMutation(deleteSector)

  const handleSubmit = (e) => {
    const toggleSector = !modalDelete.status
    e.preventDefault()
    mutateAsync({
      payload: { status: !modalDelete.status },
      id: modalDelete._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [SECTORS, queryString], data)
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

  const toggleModalEdit = useCallback((sector = null) => () => {
    setModalEdit(sector)
  }, [])

  const toggleModalDelete = useCallback((sector = null) => () => {
    setModalDelete(sector)
  }, [])

  if (isLoading) return <LoadingTable />

  if (isError) return <h1>Error</h1>

  if (!sectors.length) return <h1>Empty</h1>

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader colums={columns} />
          <TableBody>
            {sectors.map((item) => (
              <ItemRow
                onDelete={toggleModalDelete}
                onEdit={toggleModalEdit}
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
      <EditForm sector={modalEdit} open={Boolean(modalEdit)} onClose={toggleModalEdit()} />
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
