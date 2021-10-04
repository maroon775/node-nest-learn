import { createParamDecorator } from '@nestjs/common';
import { UsersEntity } from '../../entities/users.entity';
import { Request } from 'express';

export const AuthenticatedUser = createParamDecorator(
  (data, req: Request): UsersEntity => {
    return <UsersEntity>req.user;
  },
);
