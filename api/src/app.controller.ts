import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Headers,
} from '@nestjs/common';
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

  @Delete('/user/:id')
  deleteAction(@Param() params) {
    return `delete item ${params.id}`;
  }

  @Put('post')
  createItemAction(@Body() body, @Req() req) {
    console.log(req);
    return { ...body, _: Date.now() };
  }

  @Get('/list')
  getListActions(@Headers() headers, @Req() request) {
    console.log(request);
    return headers;
  }
}
