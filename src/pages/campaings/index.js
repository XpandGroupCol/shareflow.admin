import Typography from 'components/typography'

import QueryParamsProvider from 'providers/QueryParamsProvider'
import ListTable from 'components/campaigns/table'
import Filters from 'components/campaigns/filters'

const TargetPage = () => {
  return (
    <QueryParamsProvider allowValues={['page', 'search', 'status', 'role']}>
      <section className='headerSection'>
        <Typography fontSize='24px' component='h2' fontWeight='bold'>Campañas</Typography>
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

export default TargetPage
