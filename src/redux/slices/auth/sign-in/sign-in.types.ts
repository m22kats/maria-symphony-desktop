import { BaseActionType } from '@redux/action.type';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  SignInRequest,
  SignInResponse,
} from '@services/auth/auth.service.type';
import { FetchStatusEnum } from '@services/fetch.type';

export interface SignInSliceStateType {
  signInFetchStatus: FetchStatusEnum;
  signInError?: string;
  signInResponse?: SignInResponse;

  isSignIn: boolean;
  user?: SignInResponse;
}

export interface SignInActionType extends BaseActionType {
  payload: {
    request: SignInRequest;
  };
}

export interface SignInSuccessActionType extends BaseActionType {
  payload: {
    response: SignInResponse;
  };
}

export interface SignInFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}

export type RefreshTokenActionType = PayloadAction;
