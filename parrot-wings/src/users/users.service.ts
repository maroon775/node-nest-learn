import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { AuthenticatedResponse, User } from './interfaces/user';
import { CreateUserDto } from './dto/create-user.dto';
import { HashStringService } from '../common/services/hash-string';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginUserDto } from './dto/login-user.dto';
import { TransactionsEntity } from '../transactions/entities/transactions.entity';

class EventSignUp {
  constructor(public user: User) {}
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
    private readonly hashStringService: HashStringService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<AuthenticatedResponse> {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new UnauthorizedException(
        `User with email ${user.email} already exist`,
      );
    }

    createUserDto.password = await this.hashStringService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.usersRepository.save(createUserDto);

    const event = new EventSignUp(newUser);
    await this.eventEmitter.emit('users.signup', event);

    const token = await this.__createAuthToken(newUser);
    return { token };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Can't find user with id=${id}`);
    }

    const userData = this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(userData);
  }

  async checkUserById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthenticatedResponse> {
    const user = await this.usersRepository.findOne({
      email: loginUserDto.email,
    });
    const token = await this.__createAuthToken(user);
    return { token };
  }

  async profile(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['transactions'],
      select: ['id', 'email', 'fullName'],
    });

    const { balance } = await this.transactionsRepository
      .createQueryBuilder('t')
      .select('SUM(t.amount) as balance')
      .where('t.userId=:id', { id: user.id })
      .getRawOne();

    return {
      balance,
      ...user,
    };
  }

  private async __createAuthToken(user) {
    return await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
