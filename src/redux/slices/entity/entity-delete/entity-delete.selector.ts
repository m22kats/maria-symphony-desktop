import { StoreStateType } from '@redux/store.type';

export const entityDeleteSelector = {
  entityDeleteFetchStatus: (state: StoreStateType) =>
    state.entityDelete?.entityDeleteFetchStatus,
  entityDeleteError: (state: StoreStateType) =>
    state.entityDelete?.entityDeleteError,
  entityDeleteResponse: (state: StoreStateType) =>
    state.entityDelete?.entityDeleteResponse,
};
