
import Typography from 'components/typography'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/waiting/table'
import Filters from 'components/waiting/filters'

const WaitingPage = () => {
  return (
    <QueryParamsProvider allowValues={['page', 'search']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>En Espera</Typography>

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

export default WaitingPage
