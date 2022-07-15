import Button from 'components/button'
import Typography from 'components/typography'
import { useState } from 'react'

import CreateForm from 'components/ages/create'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/ages/table'
import Filters from 'components/ages/filters'

const AgePage = () => {
  const [createModal, setCreateModal] = useState(false)

  const handleOpenCreateModal = () => {
    setCreateModal(prev => !prev)
  }

  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Edades</Typography>
        <Button size='small' variant='contained' onClick={handleOpenCreateModal}>
          Nueva Edad
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

export default AgePage
