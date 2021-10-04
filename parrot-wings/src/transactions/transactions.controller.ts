import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SignupBonusDto } from './dto/signup-bonus.dto';
import { AuthGuard } from '@nestjs/passport';
import { Transaction } from './interfaces/transaction';
import { UsersService } from '../users/users.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionsEntity } from './entities/transactions.entity';
import { AuthenticatedUser } from '../users/decorators/authenticated-user';
import { UsersEntity } from '../users/entities/users.entity';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Authorized user transactions' })
  @ApiResponse({
    status: 200,
    type: TransactionsEntity,
    isArray: true,
  })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async userTransactions(
    @AuthenticatedUser() user: UsersEntity,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getTransactionsByUser(user.id);
  }

  @ApiOperation({ summary: 'Transfer money between two users' })
  @ApiResponse({
    status: 200,
    type: TransactionsEntity,
    isArray: true,
  })
  @ApiBearerAuth()
  @Post('send')
  @UseGuards(AuthGuard('jwt'))
  async transfer(
    @Body() sendTransactionDto: SendTransactionDto,
    @AuthenticatedUser() user: UsersEntity,
  ): Promise<Transaction[]> {
    return await this.transactionsService.transfer(user.id, sendTransactionDto);
  }

  @OnEvent('users.signup')
  private signUpHandler(payload: SignupBonusDto) {
    return this.transactionsService.welcomeBonusTransaction(payload.user);
  }
}
