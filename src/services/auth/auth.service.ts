import { MariaResponse } from '../maria.type';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from './auth.service.type';
import { mariaClient } from '../maria-client';

export const authService = {
  signIn: async (
    signInRequest: SignInRequest
  ): Promise<MariaResponse<SignInResponse>> => {
    // try {
    const url: string = 'http://localhost:8080/musicians/signin';
    const response = await mariaClient.post(url, signInRequest);
    return response?.data;
    // } catch (error) {
    //   console.log('error:', error);
    //   throw error;
    // } -> error handling is delegated to the saga (to quickly check detailed log, uncomment the code for easy access.)
  },
  signOut: async (): Promise<MariaResponse<any>> => {
    const url: string = 'http://localhost:8080/musicians/signout';
    const response = await mariaClient.get(url);
    return response?.data;
  },

  signUp: async (request: SignUpRequest): Promise<MariaResponse<any>> => {
    const url: string = 'http://localhost:8080/musicians/signup';
    const response = await mariaClient.post(url, request);
    return response?.data;
  },
};
