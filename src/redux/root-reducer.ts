import { combineReducers } from '@reduxjs/toolkit';
import { signInReducer } from './slices/auth/sign-in/sign-in.slice';
import { entityReducer } from './slices/entity/entity.slice';
import { signUpReducer } from './slices/auth/sign-up/sign-up.slice';
import { entityCreateReducer } from './slices/entity/entity-create/entity-create.slice';
import { connectRouter } from 'connected-react-router';
import history from '@src/routes/history';
import { entityDeleteReducer } from './slices/entity/entity-delete/entity-delete.slice';
import { pageSizeReducer } from './slices/entity/page-size/page-size.slice';

const rootReducer = combineReducers({
  signIn: signInReducer,
  entities: entityReducer,
  signUp: signUpReducer,
  entityCreate: entityCreateReducer,
  entityDelete: entityDeleteReducer,
  router: connectRouter(history),
  pageSize: pageSizeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
