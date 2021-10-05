import { User } from '../../users/interfaces/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

export class SignupBonusDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  user: User;
}
