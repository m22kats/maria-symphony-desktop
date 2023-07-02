import { StoreStateType } from '@redux/store.type';

export const pageSizeSelector = {
  pageSize: (state: StoreStateType) => state.pageSize.pageSize,
};
