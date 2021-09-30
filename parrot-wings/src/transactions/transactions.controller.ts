import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UsersService,
  ) {}

  @OnEvent('users.signup')
  __signUpHandler(payload: SignupBonusDto) {
    return this.transactionsService.welcomeBonusTransaction(payload.user);
  }

  @ApiOperation({ summary: 'Authorized user transactions' })
  @ApiResponse({
    status: 200,
    type: TransactionsEntity,
    isArray: true,
  })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async userTransactions(@Request() req): Promise<Transaction[]> {
    return await this.transactionsService.getTransactionsByUser(req.user.id);
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
    @Request() req,
  ): Promise<Transaction[]> {
    return await this.transactionsService.transfer(
      req.user.id,
      sendTransactionDto,
    );
  }
}
