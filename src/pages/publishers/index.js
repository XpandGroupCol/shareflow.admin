import Button from 'components/button'
import Typography from 'components/typography'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/publishers/table'
import Filters from 'components/publishers/filters'
import { Link } from 'react-router-dom'

const PublishersPage = () => {
  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status', 'role']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Publishers</Typography>
        <Link to='/publishers/create'>
          <Button size='small' variant='contained'>
            Nuevo Publisher
          </Button>
        </Link>
      </section>
      <section className='contentSection'>
        <div className='tableSection'>
          <Filters />
          <ListTable />
        </div>
      </section>
    </QueryParamsProvider>
  )
}

export default PublishersPage
