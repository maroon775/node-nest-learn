import { Photo } from '../../photos/interfaces/photo';

export interface User {
  id?: number;
  email: string;
  password: string;

  photos: Photo[];
}

export interface SignUpResponse {
  readonly email: string;
}

export interface LoginResponse {
  readonly token: string;
}

export type UserDocument = User & Document;
