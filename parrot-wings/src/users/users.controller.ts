import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticatedResponse, User } from './interfaces/user';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signup(
    @Body() createUserDTO: CreateUserDto,
  ): Promise<AuthenticatedResponse> {
    return await this.usersService.signUp(createUserDTO);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<AuthenticatedResponse> {
    return await this.usersService.login(loginUserDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req): Promise<User> {
    return await this.usersService.profile(req.user.id);
  }

  @ApiBearerAuth()
  @Put('edit')
  @UseGuards(AuthGuard('jwt'))
  async edit(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(req.user.id, updateUserDto);
  }
}
