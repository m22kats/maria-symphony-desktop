import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { signInWatcherSaga } from './slices/auth/sign-in/sign-in.saga';
import { signUpWatcherSaga } from './slices/auth/sign-up/sign-up.saga';
import { signOutWatcherSaga } from './slices/auth/sign-in/sign-out.saga';
import { entityCreateWatcherSaga } from './slices/entity/entity-create/entity-create.saga';
import { entityWatcherSaga } from './slices/entity/entity.saga';
import { entityDeleteWatcherSaga } from './slices/entity/entity-delete/entity-delete.saga';

export const rootSagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([
    signInWatcherSaga(),
    signUpWatcherSaga(),
    signOutWatcherSaga(),
    entityCreateWatcherSaga(),
    entityDeleteWatcherSaga(),
    entityWatcherSaga(),
  ]);
}
