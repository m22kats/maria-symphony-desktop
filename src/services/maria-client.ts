import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { StoreStateType } from '@redux/store.type';
import { store } from '@redux/store';
import { signInActions } from '@redux/slices/auth/sign-in/sign-in.slice';

const mariaClient = axios.create({
  timeout: 5 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

mariaClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config?.headers) {
    const state = store.getState() as StoreStateType;
    const token = state.signIn?.user?.token;
    config.headers['Authorization'] = `Bearer ${token}` || '';
  }
  return config;
});

mariaClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      store.dispatch(signInActions.signOut());
    }
    return Promise.reject(error);
  }
);

export { mariaClient };
