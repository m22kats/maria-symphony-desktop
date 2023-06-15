import { authService } from '@services/auth/auth.service';
import { SignInResponse } from '@services/auth/auth.service.type';
import { MariaResponse } from '@services/maria.type';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signInActions } from './sign-in.slice';
import { SignInActionType } from './sign-in.types';

function* signInSaga(action: SignInActionType) {
  try {
    const mariaResponse: MariaResponse<SignInResponse> = yield call(
      authService.signIn,
      action.payload.request
    );
    if (!mariaResponse?.data?.items?.[0]) {
      throw new Error('Sign-in failed');
    }
    yield put(
      signInActions.signInSuccess({
        response: mariaResponse?.data?.items?.[0],
      })
    );
  } catch (error: any) {
    const errorMessage = error;
    yield put(
      signInActions.signInFailure({ error: errorMessage || 'Sign-in failed' })
    );
  } finally {
  }
}

export function* signInWatcherSaga() {
  yield takeLatest(signInActions.signIn.type, signInSaga);
}
