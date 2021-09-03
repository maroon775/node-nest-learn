import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DatabaseId, TransactionDto } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/user/:user_id')
  getUserTransactions(@Param() params) {
    this.transactionsService.getUserTransactions(params.user_id);
  }

  @Post('/send/:recipient/')
  sendTransaction(
    @Body() data: TransactionDto,
    @Param('recipient') recipient: DatabaseId,
  ): DatabaseId[] {
    const senderTransactionId = this.transactionsService.addTransaction(data);
    const recipientTransactionId = this.transactionsService.addTransaction({
      ...data,
      user_id: recipient,
      amount: data.amount * -1,
      ref_transaction: senderTransactionId,
    });

    return [senderTransactionId, recipientTransactionId];
  }
}
