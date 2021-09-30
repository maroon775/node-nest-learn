import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { User } from '../users/interfaces/user';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { UsersEntity } from '../users/entities/users.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async userBalance(id: number) {
    const { balance } = await this.transactionsRepository
      .createQueryBuilder('t')
      .select('SUM(t.amount) as balance')
      .where('t.userId = :id', { id })
      .getRawOne();
    return parseFloat(balance);
  }

  welcomeBonusTransaction(user: User) {
    return this.transactionsRepository.save({
      user,
      balance: 0,
      description: 'welcome bonus',
      amount: parseFloat(process.env.MONEY_BONUS),
    });
  }

  async getTransactionsByUser(userId: number): Promise<TransactionsEntity[]> {
    return this.transactionsRepository.find({
      userId,
    });
  }

  async transfer(
    senderId: number,
    transactionData: SendTransactionDto,
  ): Promise<TransactionsEntity[]> {
    if (transactionData.userId === senderId) {
      throw new BadRequestException('Invalid recipient');
    }
    const recipient = await this.usersRepository.findOne(
      transactionData.userId,
    );

    if (!recipient) {
      throw new BadRequestException('User not found');
    }
    const senderBalance = await this.userBalance(senderId);
    if (transactionData.amount > senderBalance) {
      throw new BadRequestException('Balance exceeded');
    }

    const receiverBalance = await this.userBalance(recipient.id);
    const creditAmount = -1 * transactionData.amount;
    const creditTx = await this.transactionsRepository.create({
      userId: senderId,
      amount: creditAmount,
      balance: senderBalance - transactionData.amount,
      description: transactionData.description,
    });

    const debitTx = await this.transactionsRepository.create({
      userId: recipient.id,
      amount: transactionData.amount,
      balance: receiverBalance + transactionData.amount,
      description: transactionData.description,
    });

    return await this.transactionsRepository.save([creditTx, debitTx]);
  }
}
