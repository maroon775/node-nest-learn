import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashStringService {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(password, passwordEncrypted): Promise<boolean> {
    return await bcrypt.compare(password, passwordEncrypted);
  }
}
