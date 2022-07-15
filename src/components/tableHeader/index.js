import { TableCell, TableHead, TableRow } from '@mui/material'

const TableHeader = ({ colums }) => {
  return (
    <TableHead>
      <TableRow sx={{ background: 'rgba(34, 51, 84, 0.02)' }}>
        {colums.map(({ name, align = 'left', size = 'auto' }) => (
          <TableCell
            align={align}
            width={size}
            key={name}
            sx={{ fontWeight: 'bold' }}
          >
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
