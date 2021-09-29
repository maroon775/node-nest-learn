import { Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SignupBonusDto } from './dto/signup-bonus.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @OnEvent('users.signup')
  signUpHandler(payload: SignupBonusDto) {
    return this.transactionsService.welcomeBonusTransaction(payload.user);
  }
}
