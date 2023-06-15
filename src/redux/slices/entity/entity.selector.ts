import { StoreStateType } from '@redux/store.type';

export const entitySelector = {
  entityListData: (state: StoreStateType) => state.entities.data,
  entityListDataTotal: (state: StoreStateType) => state.entities.total,
  entityFetchStatus: (state: StoreStateType) => state.entities.fetchStatus,
};
