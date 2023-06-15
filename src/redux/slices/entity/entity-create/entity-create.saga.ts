import { put, call, takeLatest } from 'redux-saga/effects';
import {
  EntityCreateRequest,
  EntitySearchRequest,
} from '@services/entity/entity.service.type';
import { entityCreateActions } from './entity-create.slice';
import { MariaResponse } from '@services/maria.type';
import { entityService } from '@services/entity/entity.service';
import { Entity } from '@services/entity/entity.service.type';
import { entityActions } from '../entity.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { store } from '@redux/store';
import { StoreStateType } from '@redux/store.type';

const { createEntity, createEntitySuccess, createEntityFailure } =
  entityCreateActions;

export function* createEntitySaga(action: PayloadAction<EntityCreateRequest>) {
  try {
    const entityResponse: MariaResponse<Entity> = yield call(
      entityService.create,
      action.payload
    );

    if (
      entityResponse.status?.code === 'success' &&
      !!entityResponse?.data?.items
    ) {
      yield put(createEntitySuccess());

      const state = store.getState() as StoreStateType;
      const organization = state.signIn?.user?.organization;

      const searchReq = new EntitySearchRequest();
      searchReq.organization = organization!;
      yield put(entityActions.fetchEntityList({ request: searchReq }));
    } else {
      yield put(createEntityFailure());
    }
  } catch (error: any) {
    console.log(error);
    yield put(createEntityFailure());
  }
}

export function* entityCreateWatcherSaga() {
  yield takeLatest(createEntity.type, createEntitySaga);
}
