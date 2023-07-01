import { combineReducers } from '@reduxjs/toolkit';
import { signInReducer } from './slices/auth/sign-in/sign-in.slice';
import { entityReducer } from './slices/entity/entity.slice';
import { signUpReducer } from './slices/auth/sign-up/sign-up.slice';
import { entityCreateReducer } from './slices/entity/entity-create/entity-create.slice';
import { entityDeleteReducer } from './slices/entity/entity-delete/entity-delete.slice';

const rootReducer = combineReducers({
  signIn: signInReducer,
  entities: entityReducer,
  signUp: signUpReducer,
  entityCreate: entityCreateReducer,
  entityDelete: entityDeleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
