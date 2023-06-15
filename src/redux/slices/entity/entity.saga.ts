import { put, call, takeLatest } from 'redux-saga/effects';
import { Entity } from '@services/entity/entity.service.type';
import { entityService } from '@services/entity/entity.service';
import { MariaResponse } from '@services/maria.type';
import { entityActions } from './entity.slice';
import { FetchEntityActionType } from './entity.types';

const { fetchEntityList, fetchEntityListSuccess, fetchEntityListFailure } =
  entityActions;

export function* fetchEntityListSaga(action: FetchEntityActionType) {
  try {
    const mariaResponse: MariaResponse<Entity> = yield call(
      entityService.search,
      action.payload.request
    );

    const data = mariaResponse.data?.items;
    const total = mariaResponse.data?.page?.total;

    yield put(
      fetchEntityListSuccess({
        response: data ?? [],
        total: total ?? 0,
      })
    );
  } catch (error: any) {
    yield put(fetchEntityListFailure({ error: 'entity list' }));
  }
}

export function* entityWatcherSaga() {
  yield takeLatest(fetchEntityList.type, fetchEntityListSaga);
}
