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
import { CAMPAINGS } from 'configs/queryKeys'
import { useGetCampaigns } from 'hooks/useGetCampaigns'
import EmptyData from 'components/emptyData'
import ErrorRequest from 'components/errorRequest'
import { deleteCampaign } from 'services/campaigns'
import { GLOBAL_ERROR } from 'configs'
import SegmentationModal from '../segmentationModal'

const ListTable = () => {
  const { queryString, queryParams, setQueryParams } = useQueryParams()

  const { data = {}, isLoading, isError } = useGetCampaigns(queryString)
  const [detail, setDetail] = useState(null)

  const [modalDelete, setModalDelete] = useState(null)
  const { data: sectors = [], pages } = data

  const notify = useNotify()
  const queryClient = useQueryClient()
  const { mutateAsync: delelteSycn, isLoading: loading } = useMutation(deleteCampaign)

  const onDelete = (e) => {
    e.preventDefault()
    delelteSycn(modalDelete._id)
      .then(() => {
        queryClient.invalidateQueries([CAMPAINGS])
        notify.success('La campaña se ha eliminado correctamente')
        setModalDelete()
      })
      .catch(() => {
        notify.error(GLOBAL_ERROR)
      })
  }

  const handleSetPage = (_, page) => {
    setQueryParams({ page })
  }

  const toggleModalDelete = useCallback((campaign = null) => () => {
    setModalDelete(campaign)
  }, [])

  const handleSetDetail = (item) => () => {
    setDetail(item)
  }

  if (isLoading) return <LoadingTable />

  if (isError) return <ErrorRequest />

  if (!sectors.length) return <EmptyData />

  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader colums={columns} />
          <TableBody>
            {sectors.map((item) => (
              <ItemRow
                onDelete={toggleModalDelete(item)}
                key={item._id}
                item={item}
                onDetail={handleSetDetail}
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
        onSubmit={onDelete}
        loading={loading}
        condition={modalDelete?.status || false}
        text='Estas seguro que deseas elimiar la campaña?'
      />
      <SegmentationModal open={Boolean(detail)} item={detail} onClose={handleSetDetail(null)} />
    </>
  )
}

export default ListTable
