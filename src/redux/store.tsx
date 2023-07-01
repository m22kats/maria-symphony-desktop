import rootReducer from '@redux/root-reducer';

import {
  configureStore,
  Middleware as ReduxMiddleware,
} from '@reduxjs/toolkit';

import { SagaMiddleware } from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middlewares/logger.middlewear';
import { rootSaga, rootSagaMiddleware } from './root.saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signIn', 'entities'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware: Array<SagaMiddleware | ReduxMiddleware> = [
  rootSagaMiddleware,
  loggerMiddleware,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

rootSagaMiddleware.run(rootSaga);

export type AppStoreType = typeof store;

export const persistor = persistStore(store);
