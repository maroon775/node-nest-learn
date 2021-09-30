import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { HashStringService } from '../common/services/hash-string';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionsEntity, UsersEntity]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [TransactionsService, UsersService, HashStringService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
