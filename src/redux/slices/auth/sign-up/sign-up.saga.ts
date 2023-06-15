import { authService } from '@services/auth/auth.service';
import { MariaResponse } from '@src/services/maria.type';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpActions } from './sign-up.slice';
import { SignUpActionType } from './sign-up.types';

function* signUpSaga(action: SignUpActionType) {
  try {
    const mariaResponse: MariaResponse<any> = yield call(
      authService.signUp,
      action.payload.request
    );
    if (mariaResponse?.status?.code !== 'success') {
      throw new Error('Sign up failed');
    }
    yield put(
      signUpActions.signUpSuccess({
        response: {},
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      signUpActions.signUpFailure({ error: errorMessage || 'Sign-up failed' })
    );
  } finally {
  }
}

export function* signUpWatcherSaga() {
  yield takeLatest(signUpActions.signUp.type, signUpSaga);
}
