export interface User {
  id?: number;
  email: string;
  password: string;
  fullName: string;

  balance?: string;
}

export interface AuthenticatedResponse {
  token: string;
}
