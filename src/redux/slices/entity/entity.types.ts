import { Entity } from '@services/entity/entity.service.type';
import { BaseActionType } from '@redux/action.type';
import { EntitySearchRequest } from '@services/entity/entity.service.type';
import { FetchStatusEnum } from '@services/fetch.type';

export interface EntitySliceStateType {
  data: Array<Entity>;
  total: number;
  fetchStatus: FetchStatusEnum;
  fetchError?: string;
}

export interface FetchEntityActionType extends BaseActionType {
  payload: {
    request: EntitySearchRequest;
  };
}

export interface FetchEntitySuccessActionType extends BaseActionType {
  payload: {
    response: Array<Entity>;
    total: number;
  };
}

export interface FetchEntityFailureActionType extends BaseActionType {
  payload: {
    error: string;
  };
}
