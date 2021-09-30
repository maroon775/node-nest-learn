import { User } from '../../users/interfaces/user';
import { ApiProperty } from '@nestjs/swagger';

export class SignupBonusDto {
  @ApiProperty()
  user: User;
}
