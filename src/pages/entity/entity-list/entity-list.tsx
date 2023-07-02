import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GenerateManyEntities } from './components/generate-many-entities';
import { EntityFilter } from '@pages/entity/entity-list/components/filter';
import { EntityTable } from '@pages/entity/entity-list/components/table';
import TablePaginationComponent from '@shared/components/table-pagination';
import AlertDialog from '@shared/components/confirm-dialog';
import SectionTitle from '@shared/components/section-title';
import TotalCount from '@shared/components/total-count';
import { DeleteButton } from '@shared/buttons/delete-btn';
import { DataType } from '@shared/enums/app.enums';
import { MelodyType } from '@shared/enums/app.enums';
import { entityActions } from '@redux/slices/entity/entity.slice';
import { entityDeleteActions } from '@redux/slices/entity/entity-delete/entity-delete.slice';
import { entitySelector } from '@redux/slices/entity/entity.selector';
import { entityDeleteSelector } from '@redux/slices/entity/entity-delete/entity-delete.selector';
import { signInSelector } from '@redux/slices/auth/sign-in/sign-in.selector';
import { pageSizeSelector } from '@redux/slices/entity/page-size/page-size.selector';
import { changePageSize } from '@redux/slices/entity/page-size/page-size.slice';
import { FetchStatusEnum } from '@services/fetch.type';
import { Button, SelectChangeEvent } from '@mui/material';

import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const LeftSection = styled.div`
  flex: 1 1 100%;

  @media (min-width: 768px) {
    flex: 1 1 50%;
  }
`;
const RightSection = styled.div`
  flex: 1 1 100%;

  @media (min-width: 768px) {
    flex: 1 1 50%;
    display: flex;
    justify-content: flex-end;
  }
`;
const ButtonContainer = styled.div`
  margin-bottom: 13px;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & button {
    width: 100%;
  }
`;

const keys = [MelodyType.TUNE, MelodyType.NOTE];

function EntityList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<any>(null);

  const entityListDataSource = useSelector(entitySelector.entityListData);
  const entityListDataTotal = useSelector(entitySelector.entityListDataTotal);
  const entityDeleteFetchStatus = useSelector(
    entityDeleteSelector.entityDeleteFetchStatus
  );
  const organization = useSelector(signInSelector.user)?.organization;
  const currentPageSize = useSelector(pageSizeSelector.pageSize);

  const [currentEntityList, setCurrentEntityList] =
    useState(entityListDataSource);
  const [entityTotal, setEntityTotal] = useState(entityListDataTotal ?? 0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [keyName, setKeyName] = useState([...keys]);
  const [rhythmNote, setRhythmNote] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(currentPageSize);
  const [prevPageCount, setPrevPageCount] = useState(0);

  useEffect(() => {
    setCurrentEntityList(entityListDataSource ?? []);
    setEntityTotal(entityListDataTotal ?? 0);
  }, [entityListDataSource]);

  useEffect(() => {
    handleSearch();
  }, [pageIndex, pageSize]);

  useEffect(() => {
    if (entityDeleteFetchStatus === FetchStatusEnum.SUCCESS) {
      alert('Entity deleted successfully!');
      setSelectedIds([]);
      setPageIndex(0);
      setPrevPageCount(0);
      dispatch(entityDeleteActions.resetEntityDeleteState());
    } else if (entityDeleteFetchStatus === FetchStatusEnum.FAILURE) {
      alert('Error deleting entity!');
    }
  }, [entityDeleteFetchStatus]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPageIndex: number
  ) => {
    setPageIndex(newPageIndex);
    setPrevPageCount(newPageIndex * pageSize);
  };

  const handleChangeRowsPerPage = (rowsPerPage: number) => {
    setPageIndex(0);
    setPrevPageCount(0);
    dispatch(changePageSize(rowsPerPage));
    setPageSize(rowsPerPage);
  };

  const handleKeySelection = (event: SelectChangeEvent<MelodyType[]>) => {
    setKeyName(event.target.value as MelodyType[]);
  };

  const onClickSearch = () => {
    setPageIndex(0);
    setPrevPageCount(0);
    handleSearch();
  };

  const handleSearch = () => {
    const fetchEntityAction = entityActions.fetchEntityList({
      request: {
        dataType: DataType.ENTITY,
        organization: organization!,
        searchText: rhythmNote,
        code: keyName,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
    dispatch(fetchEntityAction);
  };

  const handleDeleteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    melodyId: string
  ) => {
    const isChecked = event.target.checked;
    setSelectedIds(
      isChecked
        ? [...selectedIds, melodyId]
        : selectedIds.filter((id) => id !== melodyId)
    );
  };

  const handleDeleteClick = () => {
    if (dialogRef && dialogRef.current) {
      dialogRef.current.handleClickOpen();
    }
  };
  const handleDeleteConfirm = (isConfirmed: boolean) => {
    if (isConfirmed) {
      const deleteEntityAction = entityDeleteActions.deleteEntity({
        dataType: DataType.ENTITY,
        melodyIds: selectedIds,
      });
      dispatch(deleteEntityAction);
    }
  };

  return (
    <>
      <div>
        <AlertDialog
          title="Delete Selected Entities"
          content="Are you sure to delete?"
          ref={dialogRef}
          onConfirm={(confirmed: boolean) => handleDeleteConfirm(confirmed)}
        />
      </div>
      <Container>
        <LeftSection>
          <div className="page-title">Melody Entity List</div>
        </LeftSection>
        <RightSection>
          <ButtonContainer>
            <Button
              sx={{ m: 1, height: 50, width: 300 }}
              variant="outlined"
              onClick={() => navigate('/entity/0/create')}
            >
              Add New Entity
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <GenerateManyEntities />
          </ButtonContainer>
        </RightSection>
      </Container>
      <SectionTitle title="1. Filter by"></SectionTitle>
      <EntityFilter
        keys={keys}
        keyName={keyName}
        rhythmNote={rhythmNote}
        onKeySelection={handleKeySelection}
        onKeyValueChange={(event: any) => setRhythmNote(event.target.value)}
        onClickSearch={onClickSearch}
      />
      <TotalCount count={entityTotal}></TotalCount>
      <SectionTitle title="2. Search Result"></SectionTitle>
      {selectedIds.length > 0 && (
        <DeleteButton
          text="Selected Entities"
          onClick={handleDeleteClick}
        ></DeleteButton>
      )}
      <EntityTable
        data={currentEntityList}
        selectedIds={selectedIds}
        handleDeleteChange={handleDeleteChange}
        prevPageCount={prevPageCount}
      />
      <TablePaginationComponent
        page={pageIndex}
        rowsPerPage={pageSize}
        totalRows={entityTotal}
        onPageChange={(event, newPageIndex) =>
          handlePageChange(event, newPageIndex)
        }
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default EntityList;

// function handleClick(id) {
//   navigate(`/entity/${id}/detail`, { search: `?id=${id}` });
// }
