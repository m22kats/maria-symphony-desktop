import { put, call, takeLatest, select } from 'redux-saga/effects';
import { Entity } from '@services/entity/entity.service.type';
import { entityService } from '@services/entity/entity.service';
import { MariaResponse } from '@services/maria.type';
import { entityActions } from './entity.slice';
import { FetchEntityActionType } from './entity.types';
import { pageSizeSelector } from './page-size/page-size.selector';
import { StoreStateType } from '@redux/store.type';

const { fetchEntityList, fetchEntityListSuccess, fetchEntityListFailure } =
  entityActions;

export function* fetchEntityListSaga(action: FetchEntityActionType) {
  try {
    const pageSize: number = yield select((state: StoreStateType) =>
      pageSizeSelector.pageSize(state)
    );

    const request = {
      ...action.payload.request,
      pageSize: pageSize,
    };

    const mariaResponse: MariaResponse<Entity> = yield call(
      entityService.search,
      request
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
    console.log(error);
    yield put(fetchEntityListFailure({ error: 'entity list' }));
  }
}

export function* entityWatcherSaga() {
  yield takeLatest(fetchEntityList.type, fetchEntityListSaga);
}
