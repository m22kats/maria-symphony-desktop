import { BaseActionType } from '@redux/action.type';
import { SignUpRequest } from '@services/auth/auth.service.type';
import { FetchStatusEnum } from '@services/fetch.type';
import { MariaResponse } from '@services/maria.type';

export interface SignUpSliceStateType {
  signUpFetchStatus: FetchStatusEnum;
  signUpError?: string;
  signUpResponse?: MariaResponse<any>;
}

export interface SignUpActionType extends BaseActionType {
  payload: {
    request: SignUpRequest;
  };
}

export interface SignUpSuccessActionType extends BaseActionType {
  payload: {
    response: MariaResponse<any>;
  };
}

export interface SignUpFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}
