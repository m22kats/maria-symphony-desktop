import { FetchStatusEnum } from '@services/fetch.type';
import { MariaResponse } from '@services/maria.type';

export interface EntityCreateSliceStateType {
  entityCreateFetchStatus: FetchStatusEnum;
  entityCreateError?: string;
  entityCreateResponse?: MariaResponse;
}
