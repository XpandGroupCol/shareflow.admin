import { useCallback, useState } from 'react'
import { Table, TableBody, TableContainer } from '@mui/material'
import { useGetAges } from 'hooks/useGetAges'
import { useMutation, useQueryClient } from 'react-query'

import { useQueryParams } from 'providers/QueryParamsProvider'

import TableHeader from 'components/tableHeader'
import LoadingTable from 'components/loadingTable'
import PageSection from 'components/pageSection'
import ItemRow from './row'
import { columns } from './colums'
import EditForm from '../edit'

import ConfirmationModal from 'components/confirmationModal'
import { useNotify } from 'hooks/useNotify'

import { deleteAge } from 'services/ages'
import { mutateLocalState } from 'utils/mutateLocalState'
import { AGES } from 'configs/queryKeys'

const ListTable = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetAges(queryString)
  const [modalEdit, setModalEdit] = useState(null)
  const [modalDelete, setModalDelete] = useState(null)
  const { data: items = [], pages } = data

  const notify = useNotify()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loading } = useMutation(deleteAge)

  const handleSubmit = (e) => {
    const toggleSector = !modalDelete.status
    e.preventDefault()
    mutateAsync({
      payload: { status: !modalDelete.status },
      id: modalDelete._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [AGES, queryString], data)
        notify.success(`La edad se ha ${toggleSector ? 'activado' : 'desactivado'} correctamente`)
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

  if (!items.length) return <h1>Empty</h1>

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader colums={columns} />
          <TableBody>
            {items.map((item) => (
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
      <EditForm item={modalEdit} open={Boolean(modalEdit)} onClose={toggleModalEdit()} />
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
