import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { PhotosEntity } from '../photos/entities/photos.entity';
import { LoginResponse, User, UserDocument } from './interfaces/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(PhotosEntity)
    private readonly photosRepository: Repository<PhotosEntity>,
    @InjectModel('Users')
    private readonly userModel: Model<UserDocument>,
    private readonly hasherService: PasswordHasherService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userModel = await this.userRepository.findOne(id, {
      relations: ['photos'],
    });
    if (userModel) {
      const userData = await this.userRepository.merge(
        userModel,
        updateUserDto,
      );
      return await this.userRepository.save(userData);
    } else {
      throw new NotFoundException('Could not find any users');
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserDocument> {
    const checkUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (checkUser) {
      throw new UnauthorizedException(
        `User with email ${checkUser.email} already exist`,
      );
    }

    const encryptedPassword = await this.hasherService.hashPassword(
      createUserDto.password,
    );
    const newUser = new this.userModel({
      email: createUserDto.email,
      password: encryptedPassword,
    });
    return await newUser.save();
  }

  async login(email, password): Promise<LoginResponse> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(`Can\`t find user with email ${email}`);
    } else if (
      (await this.hasherService.comparePassword(password, user.password)) ===
      false
    ) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    const token = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
      },
      {
        expiresIn: '1h',
      },
    );
    return { token };
  }

  async validateUserById(userId: string): Promise<boolean> {
    return Boolean(await this.userModel.findById(userId));
  }
}
