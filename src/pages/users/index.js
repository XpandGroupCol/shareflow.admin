import Button from 'components/button'
import Typography from 'components/typography'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/users/table'
import Filters from 'components/users/filters'
import { Link } from 'react-router-dom'

const UserPage = () => {
  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status', 'role']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Usuarios</Typography>
        <Link to='/users/create'>
          <Button size='small' variant='contained'>
            Nuevo Usuario
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

export default UserPage
