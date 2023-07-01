import { Column, useTable } from 'react-table';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
// import styled from 'styled-components';

// const StyledTableRow = styled(TableRow)`
//   &.default-row {
//     background-color: yellow;
//   }
// `;

type TableProps = {
  columns: Column[];
  data: any[];
  prevCount?: number;
  initialState?: {};
};

function CustomTable({ columns, data, prevCount, initialState }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState,
    });

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <TableCell>#</TableCell>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                style={{
                  backgroundColor: row.original.isDefault
                    ? '#e6fffc'
                    : undefined,
                }}
              >
                <TableCell>
                  {prevCount !== undefined ? index + prevCount + 1 : index + 1}
                </TableCell>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CustomTable;
