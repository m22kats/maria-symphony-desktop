import { put, call, takeLatest } from 'redux-saga/effects';
import {
  EntityDeleteRequest,
  EntitySearchRequest,
} from '@services/entity/entity.service.type';
import { entityDeleteActions } from './entity-delete.slice';
import { MariaResponse } from '@services/maria.type';
import { entityService } from '@services/entity/entity.service';
import { Entity } from '@services/entity/entity.service.type';
import { entityActions } from '../entity.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { store } from '@redux/store';
import { StoreStateType } from '@redux/store.type';

const { deleteEntity, deleteEntitySuccess, deleteEntityFailure } =
  entityDeleteActions;

export function* deleteEntitySaga(action: PayloadAction<EntityDeleteRequest>) {
  try {
    const entityResponse: MariaResponse<Entity> = yield call(
      entityService.delete,
      action.payload
    );

    if (
      entityResponse.status?.code === 'success' &&
      !!entityResponse?.data?.items
    ) {
      yield put(deleteEntitySuccess());

      const state = store.getState() as StoreStateType;
      const organization = state.signIn?.user?.organization;

      const searchReq = new EntitySearchRequest();
      searchReq.organization = organization!;
      yield put(entityActions.fetchEntityList({ request: searchReq }));
    } else {
      yield put(deleteEntityFailure());
    }
  } catch (error: any) {
    console.log(error);
    yield put(deleteEntityFailure());
  }
}

export function* entityDeleteWatcherSaga() {
  yield takeLatest(deleteEntity.type, deleteEntitySaga);
}
