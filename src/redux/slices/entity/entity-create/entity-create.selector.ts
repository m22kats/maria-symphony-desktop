import { StoreStateType } from '@redux/store.type';

export const entityCreateSelector = {
  entityCreateFetchStatus: (state: StoreStateType) =>
    state.entityCreate?.entityCreateFetchStatus,
  entityCreateError: (state: StoreStateType) =>
    state.entityCreate?.entityCreateError,
  entityCreateResponse: (state: StoreStateType) =>
    state.entityCreate?.entityCreateResponse,
};
