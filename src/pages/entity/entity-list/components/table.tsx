// import { Link } from 'react-router-dom';
import { Entity } from '@services/entity/entity.service.type';
import CustomTable from '@shared/components/custom-table';
import { Checkbox } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';

interface EntityTableProps {
  data: Array<Entity>;
  selectedIds: Array<string>;
  handleDeleteChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  prevPageCount: number;
}

export const EntityTable = ({
  data,
  selectedIds,
  handleDeleteChange,
  prevPageCount,
}: EntityTableProps) => {
  const columns = [
    {
      Header: 'Melody Title',
      accessor: 'title',
      // Cell: ({ value, row }: { value: string; row: any }) => (
      //   <Link to={`/entries?id=${row.original.melodyId}`} className="clickable">
      //     {value}
      //   </Link>
      // ),
    },
    {
      Header: 'Organization',
      accessor: 'organization',
    },
    {
      Header: 'Melody Type',
      accessor: 'type',
    },
    {
      Header: 'Rhythm Code',
      accessor: 'rhythmNote',
    },
    {
      Header: 'Active',
      accessor: 'isActive',
      Cell: ({ value }: { value: boolean }) =>
        value ? <Check color="success" /> : <Clear color="error" />,
    },
    {
      Header: 'Delete',
      accessor: 'melodyId',
      Cell: ({ value }: { value: string }) => (
        <Checkbox
          checked={selectedIds.includes(value)}
          onChange={(event) => handleDeleteChange(event, value)}
          color="primary"
        />
      ),
    },
    {
      Header: 'Created',
      accessor: 'createTime',
    },
    {
      Header: 'Update',
      accessor: 'updateTime',
    },
  ];

  return (
    <CustomTable columns={columns} data={data} prevCount={prevPageCount} />
  );
};
