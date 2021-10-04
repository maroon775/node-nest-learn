import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashStringService {
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  comparePassword(password, passwordEncrypted): Promise<boolean> {
    return bcrypt.compare(password, passwordEncrypted);
  }
}
