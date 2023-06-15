import { StoreStateType } from '@redux/store.type';

export const signUpSelector = {
  signUpFetchStatus: (state: StoreStateType) => state.signUp?.signUpFetchStatus,
  signUpError: (state: StoreStateType) => state.signUp?.signUpError,
  signUpResponse: (state: StoreStateType) => state.signUp?.signUpResponse,
};
