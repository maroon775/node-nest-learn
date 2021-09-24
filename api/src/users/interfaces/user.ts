import { Photo } from '../../photos/interfaces/photo';

export interface User {
  id?: number;
  email: string;
  password: string;

  photos: Photo[];
}
