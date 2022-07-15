import { Table, TableBody, TableContainer } from '@mui/material'

import TableHeader from 'components/tableHeader'
import { useQueryParams } from 'providers/QueryParamsProvider'
import LoadingTable from 'components/loadingTable'
import PageSection from 'components/pageSection'
import ItemRow from './row'
import { columns } from './colums'
import { useGetInvitation } from 'hooks/useGetInvitation'
import { useSendEmail } from 'hooks/useSendEmail'

const ListTable = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetInvitation(queryString)

  const { loading, send } = useSendEmail()

  const { data: invitations = [], pages } = data

  const handleSetPage = (_, page) => {
    setQueryParams({ page })
  }

  if (isLoading) return <LoadingTable />

  if (isError) return <h1>Error</h1>

  if (!invitations.length) return <h1>Empty</h1>

  const onSend = ({ _id }) => () => {
    send(_id)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader colums={columns} />
          <TableBody>
            {invitations.map((item) => (
              <ItemRow
                onSend={onSend}
                key={item._id}
                item={item}
                loading={loading}
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
    </>
  )
}

export default ListTable
