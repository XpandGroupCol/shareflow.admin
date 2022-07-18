import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const OrderTable = ({
  data = []
}) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell width='20%'>Medio</TableCell>
            <TableCell width='20%'>Objetivo publicitario</TableCell>
            <TableCell width='20%'>Formato</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ _id, label, share, publisher, value, summary }) => (
            <TableRow
              key={_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{publisher}</TableCell>
              <TableCell>{label}</TableCell>
              <TableCell align='right'>{share}%</TableCell>

            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
