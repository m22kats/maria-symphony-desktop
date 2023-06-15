import { TablePagination } from '@mui/material';

interface Props {
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

function TablePaginationComponent(props: Props) {
  const { page, rowsPerPage, totalRows, onPageChange, onRowsPerPageChange } =
    props;

  return (
    <TablePagination
      component="div"
      count={totalRows}
      page={page}
      onPageChange={(event, newPage) => onPageChange(event, newPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(event) =>
        onRowsPerPageChange(parseInt(event.target.value, 10))
      }
      rowsPerPageOptions={[10, 25, 50]}
      showFirstButton={true}
      showLastButton={true}
    />
  );
}
export default TablePaginationComponent;
