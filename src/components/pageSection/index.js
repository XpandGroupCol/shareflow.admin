import { Pagination } from '@mui/material'

const PageSection = ({ page = 1, onChange, count }) => {
  return (
    <div className='paginationSection'>
      <Pagination count={count} page={parseInt(page)} onChange={onChange} />
    </div>
  )
}

export default PageSection
