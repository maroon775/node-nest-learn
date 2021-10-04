import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersEntity } from '../../entities/users.entity';
import { Request } from 'express';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsersEntity => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return <UsersEntity>req.user;
  },
);
