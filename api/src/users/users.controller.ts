import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginResponse, SignUpResponse, User } from './interfaces/user';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.update(id, user);
  }

  @Post('signup')
  async signup(@Body() params: CreateUserDto): Promise<SignUpResponse> {
    const { email } = await this.userService.signUp(params);
    return { email };
  }

  @Post('login')
  async login(
    @Body('email') email,
    @Body('password') password,
  ): Promise<LoginResponse> {
    return await this.userService.login(email, password);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  async profile(@Request() req) {
    return req.user;
  }
}
