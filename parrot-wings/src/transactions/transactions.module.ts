import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { UsersEntity } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsEntity, UsersEntity])],
  providers: [TransactionsService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
