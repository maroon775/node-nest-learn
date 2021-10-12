import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { HashStringService } from '../common/services/hash-string';
import { JwtStrategyService } from '../common/services/jwt-strategy';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionsEntity } from '../transactions/entities/transactions.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserSubscriber } from './subscribers/users.subscriber';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([TransactionsEntity, UsersEntity]),
  ],
  providers: [
    JwtStrategyService,
    TransactionsService,
    UsersService,
    HashStringService,
    UserSubscriber,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
