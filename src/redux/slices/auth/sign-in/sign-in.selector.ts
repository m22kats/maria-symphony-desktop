import { StoreStateType } from '@redux/store.type';

export const signInSelector = {
  signInFetchStatus: (state: StoreStateType) => state.signIn?.signInFetchStatus,
  signInError: (state: StoreStateType) => state.signIn?.signInError,
  signInResponse: (state: StoreStateType) => state.signIn?.signInResponse,
  isSignIn: (state: StoreStateType) => state.signIn?.isSignIn,
  user: (state: StoreStateType) => state.signIn?.user,
};
