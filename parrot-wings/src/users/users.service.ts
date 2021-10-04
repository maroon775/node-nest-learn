import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Not, Repository } from 'typeorm';
import { AuthenticatedResponse, User } from './interfaces/user';
import { CreateUserDto } from './dto/create-user.dto';
import { HashStringService } from '../common/services/hash-string';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginUserDto } from './dto/login-user.dto';

class EventSignUp {
  constructor(public user: User) {}
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly hashStringService: HashStringService,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<AuthenticatedResponse> {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new HttpException(
        'A user with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    createUserDto.password = await this.hashStringService.hashPassword(
      createUserDto.password,
    );

    const newUser = await this.usersRepository.save(createUserDto);

    const event = new EventSignUp(newUser);
    await this.eventEmitter.emit('users.signup', event);

    const token = this.createAuthToken(newUser);
    return { token };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Can't find user with id=${id}`);
    }

    if (updateUserDto.email) {
      const _checkEmail = await this.usersRepository.findOne({
        id: Not(id),
        email: updateUserDto.email,
      });
      if (_checkEmail) {
        throw new HttpException(
          'A user with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashStringService.hashPassword(
        updateUserDto.password,
      );
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
    const isValidPassword = await this.hashStringService.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.createAuthToken(user);
    return { token };
  }

  async profile(id: number): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('u')
      .leftJoin('transactions', 't', 't.userId=u.id')
      .select([
        'u.id as id',
        'u.email as email',
        'u.fullName as fullName',
        'SUM(t.amount) as balance',
      ])
      .where('u.id = :id', { id })
      .getRawOne();
  }

  private createAuthToken(user) {
    return this.jwtService.sign(
      {
        email: user.email,
        id: user.id,
      },
      {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
