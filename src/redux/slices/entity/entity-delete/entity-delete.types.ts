import { FetchStatusEnum } from '@services/fetch.type';
import { MariaResponse } from '@services/maria.type';

export interface EntityDeleteSliceStateType {
  entityDeleteFetchStatus: FetchStatusEnum;
  entityDeleteError?: string;
  entityDeleteResponse?: MariaResponse;
}
