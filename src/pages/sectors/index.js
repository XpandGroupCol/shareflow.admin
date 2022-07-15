import Button from 'components/button'
import Typography from 'components/typography'
import { useState } from 'react'

import CreateForm from 'components/sectors/create'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/sectors/table'
import Filters from 'components/sectors/filters'

const SectorPage = () => {
  const [createModal, setCreateModal] = useState(false)

  const handleOpenCreateModal = () => {
    setCreateModal(prev => !prev)
  }

  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Sectores</Typography>
        <Button size='small' variant='contained' onClick={handleOpenCreateModal}>
          Nuevo Sector
        </Button>
      </section>
      <section className='contentSection'>

        <div className='tableSection'>
          <Filters />
          <ListTable />
        </div>
      </section>
      <CreateForm open={createModal} onClose={handleOpenCreateModal} />
    </QueryParamsProvider>
  )
}

export default SectorPage
