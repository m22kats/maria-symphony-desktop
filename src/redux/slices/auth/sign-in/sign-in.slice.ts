import { createSlice } from '@reduxjs/toolkit';
import { FetchStatusEnum } from '@services/fetch.type';

import {
  SignInSliceStateType,
  SignInActionType,
  SignInSuccessActionType,
  SignInFailureActionType,
} from './sign-in.types';

const initState: SignInSliceStateType = {
  signInFetchStatus: FetchStatusEnum.IDLE,
  signInError: undefined,
  signInResponse: undefined,

  user: undefined,
  isSignIn: false,
};

const signInSlice = createSlice({
  name: 'sign-in',
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    signIn: (state, _action: SignInActionType) => {
      state.signInFetchStatus = FetchStatusEnum.FETCHING;
      state.signInError = '';
    },
    signInSuccess: (state, action: SignInSuccessActionType) => {
      state.signInFetchStatus = FetchStatusEnum.SUCCESS;
      state.isSignIn = true;
      state.user = action.payload.response as any;
      state.signInResponse = action.payload.response;
    },
    signInFailure: (state, action: SignInFailureActionType) => {
      state.signInFetchStatus = FetchStatusEnum.FAILURE;
      state.signInError = action.payload.error;
      state.isSignIn = false;
    },
    resetSignIn: (state) => {
      return initState;
    },
    signOut: () => {},
  },
});

export const signInActions = signInSlice.actions;

export const signInReducer = signInSlice.reducer;
