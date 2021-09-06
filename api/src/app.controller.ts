import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AppErrorResponseDTO,
  AuthorizationParamsDTO,
  AuthorizationResponseDTO,
} from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/authorize')
  postAuthorize(
    @Param() params: AuthorizationParamsDTO,
  ): AppErrorResponseDTO | AuthorizationResponseDTO {
    if (params.email && params.password) {
      return {
        token: 'sessionAuthToken',
      };
    }
    return {
      errorMessage: 'Forbidden',
    };
  }

  @Delete(':id')
  deleteAction(@Param() params) {
    return `delete item ${params.id}`;
  }
}
