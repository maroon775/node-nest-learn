import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { PhotosEntity } from '../photos/entities/photos.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';

@Module({
  imports: [
    JwtModule.register({ secret: jwtConstants.secret }),
    TypeOrmModule.forFeature([UsersEntity, PhotosEntity]),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasherService, JwtStrategyService],
})
export class UsersModule {}
