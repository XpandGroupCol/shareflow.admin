import { Table, TableBody, TableContainer } from '@mui/material'

import TableHeader from 'components/tableHeader'
import { useQueryParams } from 'providers/QueryParamsProvider'
import LoadingTable from 'components/loadingTable'
import PageSection from 'components/pageSection'
import SectorRow from './row'
import { columns } from './colums'
import { useCallback, useState } from 'react'
import ConfirmationModal from 'components/confirmationModal'
import { useNotify } from 'hooks/useNotify'
import { useMutation, useQueryClient } from 'react-query'
import { mutateLocalState } from 'utils/mutateLocalState'

import { USERS } from 'configs/queryKeys'
import { useGetUsers } from 'hooks/useGetUsers'
import { deleteUser } from 'services/users'

const ListTable = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetUsers(queryString)
  const [modalDelete, setModalDelete] = useState(null)
  const { data: sectors = [], pages } = data

  const notify = useNotify()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loading } = useMutation(deleteUser)

  const handleSubmit = (e) => {
    const toggleSector = !modalDelete.status
    e.preventDefault()
    mutateAsync({
      payload: { status: !modalDelete.status },
      id: modalDelete._id
    })
      .then(({ data }) => {
        mutateLocalState(queryClient, [USERS, queryString], data)
        notify.success(`El usuario se ha ${toggleSector ? 'activado' : 'desactivado'} correctamente`)
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

  if (isError) return <h1>Error</h1>

  if (!sectors.length) return <h1>Empty</h1>

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader colums={columns} />
          <TableBody>
            {sectors.map((item) => (
              <SectorRow
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
