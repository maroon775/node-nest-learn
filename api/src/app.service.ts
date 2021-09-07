import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly cats: [];

  getHello(): string {
    return 'Hello World!';
  }
}
