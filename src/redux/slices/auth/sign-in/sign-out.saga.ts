import { authService } from '@services/auth/auth.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signInActions } from './sign-in.slice';

function* signOutSaga() {
  try {
    yield call(authService.signOut);
  } catch (error: any) {
    console.log(error);
  } finally {
    yield put(signInActions.resetSignIn());
  }
}

export function* signOutWatcherSaga() {
  yield takeLatest(signInActions.signOut.type, signOutSaga);
}
