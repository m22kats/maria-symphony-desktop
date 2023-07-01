import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchStatusEnum } from '@services/fetch.type';
import {
  EntitySliceStateType,
  FetchEntityActionType,
  FetchEntitySuccessActionType,
} from './entity.types';

const initialState: EntitySliceStateType = {
  data: [],
  total: 0,
  fetchStatus: FetchStatusEnum.IDLE,
  fetchError: undefined,
};

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    resetAllState: () => initialState,
    fetchEntityList: (state, _action: FetchEntityActionType) => {
      state.fetchStatus = FetchStatusEnum.FETCHING;
      state.fetchError = undefined;
    },
    fetchEntityListSuccess: (state, action: FetchEntitySuccessActionType) => {
      state.fetchStatus = FetchStatusEnum.SUCCESS;
      state.data = action.payload.response as any;
      state.total = action.payload.total;
    },
    fetchEntityListFailure: (
      state,
      action: PayloadAction<{ error: string }>
    ) => {
      state.fetchStatus = FetchStatusEnum.FAILURE;
      state.fetchError = action.payload.error;
    },
  },
});

export const entityActions = entitySlice.actions;
export const entityReducer = entitySlice.reducer;
