import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { createUserDTO } from './dto/create-user.dto';
import { AuthenticatedResponse, User } from './interfaces/user';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { loginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateUserDTO } from './dto/update-user.dto';
import { AuthenticatedUser } from './decorators/authenticated-user';
import { UsersEntity } from './entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Post('sign-up')
  signup(@Body() createUserDTO: createUserDTO): Promise<AuthenticatedResponse> {
    return this.usersService.signUp(createUserDTO);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: loginUserDto,
  ): Promise<AuthenticatedResponse> {
    return await this.usersService.login(loginUserDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@AuthenticatedUser() user: UsersEntity): Promise<User> {
    return await this.usersService.getUser(user.id, true);
  }

  @ApiBearerAuth()
  @Put('edit')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @AuthenticatedUser() user: UsersEntity,
    @Body() updateUserDto: updateUserDTO,
  ): Promise<User> {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete('delete')
  @UseGuards(AuthGuard('jwt'))
  async delete(@AuthenticatedUser() user: UsersEntity) {
    return await this.usersService.delete(user.id);
  }
}
