import Button from 'components/button'
import Typography from 'components/typography'
import { useState } from 'react'

import CreateForm from 'components/targets/create'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/targets/table'
import Filters from 'components/targets/filters'

const TargetPage = () => {
  const [createModal, setCreateModal] = useState(false)

  const handleOpenCreateModal = () => {
    setCreateModal(prev => !prev)
  }

  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status', 'category']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Objetivos</Typography>
        <Button size='small' variant='contained' onClick={handleOpenCreateModal}>
          Nuevo Objetivo
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

export default TargetPage
