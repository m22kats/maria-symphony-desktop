export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  username: string;
  password: string;
  organization: string;
  token: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  organization: string;
}
