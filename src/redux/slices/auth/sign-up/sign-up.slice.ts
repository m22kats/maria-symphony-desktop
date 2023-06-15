import { createSlice } from '@reduxjs/toolkit';
import { FetchStatusEnum } from '@services/fetch.type';

import {
  SignUpSliceStateType,
  SignUpActionType,
  SignUpSuccessActionType,
  SignUpFailureActionType,
} from './sign-up.types';

const initState: SignUpSliceStateType = {
  signUpFetchStatus: FetchStatusEnum.IDLE,
  signUpError: undefined,
  signUpResponse: undefined,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    signUp: (state, _action: SignUpActionType) => {
      state.signUpFetchStatus = FetchStatusEnum.FETCHING;
      state.signUpError = '';
    },
    signUpSuccess: (state, action: SignUpSuccessActionType) => {
      state.signUpFetchStatus = FetchStatusEnum.SUCCESS;
      state.signUpResponse = action.payload.response;
    },
    signUpFailure: (state, action: SignUpFailureActionType) => {
      state.signUpFetchStatus = FetchStatusEnum.FAILURE;
      state.signUpError = action.payload.error;
    },
    resetSignUp: (state) => {
      state.signUpFetchStatus = FetchStatusEnum.IDLE;
      state.signUpError = undefined;
      state.signUpResponse = undefined;
    },
  },
});

export const signUpActions = signUpSlice.actions;

export const signUpReducer = signUpSlice.reducer;
