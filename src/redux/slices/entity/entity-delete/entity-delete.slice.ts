import { createSlice } from '@reduxjs/toolkit';
import { EntityDeleteSliceStateType } from './entity-delete.types';
import { FetchStatusEnum } from '@services/fetch.type';

const initialState: EntityDeleteSliceStateType = {
  entityDeleteFetchStatus: FetchStatusEnum.IDLE,
  entityDeleteError: undefined,
  entityDeleteResponse: undefined,
};

const entityDeleteSlice = createSlice({
  name: 'entity-delete',
  initialState: initialState,
  reducers: {
    resetAllState: () => initialState,
    deleteEntity: (state, _action) => {
      state.entityDeleteFetchStatus = FetchStatusEnum.FETCHING;
      state.entityDeleteError = undefined;
    },
    deleteEntitySuccess: (state) => {
      state.entityDeleteFetchStatus = FetchStatusEnum.SUCCESS;
    },
    deleteEntityFailure: (state) => {
      state.entityDeleteFetchStatus = FetchStatusEnum.FAILURE;
    },
    resetEntityDeleteState: (state) => {
      state.entityDeleteFetchStatus = FetchStatusEnum.IDLE;
      state.entityDeleteError = undefined;
      state.entityDeleteResponse = undefined;
    },
  },
});

export const entityDeleteActions = entityDeleteSlice.actions;
export const entityDeleteReducer = entityDeleteSlice.reducer;
