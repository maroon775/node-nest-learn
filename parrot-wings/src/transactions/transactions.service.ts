import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { User } from '../users/interfaces/user';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
  ) {}

  welcomeBonusTransaction(user: User) {
    return this.transactionsRepository.save({
      user,
      balance: 0,
      description: 'welcome bonus',
      amount: parseFloat(process.env.MONEY_BONUS),
    });
  }
}
