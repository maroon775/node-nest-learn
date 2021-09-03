import { Injectable } from '@nestjs/common';
import { TransactionDto, DatabaseId } from './dto/transaction.dto';


@Injectable()
export class TransactionsService {
  private transactions: TransactionDto[];

  getUserTransactions(user_id: DatabaseId): TransactionDto[] {
    return this.transactions.filter((t) => t.user_id === user_id);
  }

  addTransaction(params: TransactionDto): DatabaseId {
    this.transactions.push({
      user_id: params.user_id,
      timestamp: Date.now(),
      amount: params.amount,
      message: params.message,
    });

    return this.transactions.length - 1;
  }
}
