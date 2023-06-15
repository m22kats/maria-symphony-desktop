import { createSlice } from '@reduxjs/toolkit';
import { EntityCreateSliceStateType } from './entity-create.types';
import { FetchStatusEnum } from '@services/fetch.type';

const initialState: EntityCreateSliceStateType = {
  entityCreateFetchStatus: FetchStatusEnum.IDLE,
  entityCreateError: undefined,
  entityCreateResponse: undefined,
};

const entityCreateSlice = createSlice({
  name: 'entity-create',
  initialState: initialState,
  reducers: {
    resetAllState: () => initialState,
    createEntity: (state, _action) => {
      state.entityCreateFetchStatus = FetchStatusEnum.FETCHING;
      state.entityCreateError = undefined;
    },
    createEntitySuccess: (state) => {
      state.entityCreateFetchStatus = FetchStatusEnum.SUCCESS;
    },
    createEntityFailure: (state) => {
      state.entityCreateFetchStatus = FetchStatusEnum.FAILURE;
    },
    resetEntityCreateState: (state) => {
      state.entityCreateFetchStatus = FetchStatusEnum.IDLE;
      state.entityCreateError = undefined;
      state.entityCreateResponse = undefined;
    },
  },
});

export const entityCreateActions = entityCreateSlice.actions;
export const entityCreateReducer = entityCreateSlice.reducer;
