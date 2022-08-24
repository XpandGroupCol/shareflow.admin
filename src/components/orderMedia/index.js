
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const orderMedia = ({
  data = []
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width='80%' sx={{ fontWeight: 'bold' }}>Medio</TableCell>
            <TableCell width='20%' align='right' sx={{ fontWeight: 'bold' }}>Recurso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ _id, label, publisher, media }) => (
            <TableRow
              key={_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{publisher} ({label})</TableCell>
              <TableCell align='right'>
                {media?.url
                  ? (
                    <a href={media?.url} target='blank'>
                      Ver recurso
                    </a>)
                  : 'Recurso no disponible'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default orderMedia
