import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { PhotosEntity } from '../photos/entities/photos.entity';
import { User } from './interfaces/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(PhotosEntity)
    private readonly photosRepository: Repository<PhotosEntity>,
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
}
