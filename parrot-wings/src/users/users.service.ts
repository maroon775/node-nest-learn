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
import { createUserDTO } from './dto/create-user.dto';
import { HashStringService } from '../common/services/hash-string';
import { JwtService } from '@nestjs/jwt';
import { updateUserDTO } from './dto/update-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { loginUserDto } from './dto/login-user.dto';

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

  getAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  async signUp(createUserDto: createUserDTO): Promise<AuthenticatedResponse> {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });
    if (user) {
      throw new HttpException(
        'A user with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.usersRepository.save(createUserDto);

    const event = new EventSignUp(newUser);
    await this.eventEmitter.emit('users.signup', event);

    const token = this.createAuthToken(newUser);
    return { token };
  }

  async update(id: number, updateUserDto: updateUserDTO): Promise<User> {
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

    const userData = this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(userData);
  }

  async login(loginUserDto: loginUserDto): Promise<AuthenticatedResponse> {
    const user = await this.usersRepository.findOne({
      email: loginUserDto.email,
    });
    const isValidPassword =
      user &&
      (await this.hashStringService.comparePassword(
        loginUserDto.password,
        user.password,
      ));
    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.createAuthToken(user);
    return { token };
  }

  async getUser(id: number, withBalance = false): Promise<User> {
    const query = this.usersRepository
      .createQueryBuilder('u')
      .where('u.id = :id', { id });
    if (withBalance) {
      query
        .leftJoin('transactions', 't', 't.userId=u.id')
        .select([
          'u.id as id',
          'u.email as email',
          'u.fullName as fullName',
          'SUM(t.amount) as balance',
        ]);
    } else {
      query.select([
        'u.id as id',
        'u.email as email',
        'u.fullName as fullName',
      ]);
    }
    return await query.getRawOne();
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

  async delete(userId: number) {
    return this.usersRepository.delete(userId);
  }
}
