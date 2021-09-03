export interface AppErrorResponseDTO {
  errorMessage: string;
}

export interface AuthorizationParamsDTO {
  email: string;
  password: string;
}

export interface AuthorizationResponseDTO {
  token: string;
}
