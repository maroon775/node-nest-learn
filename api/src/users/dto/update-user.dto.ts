import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { CreatePhotoDto } from '../../photos/dto/create-photo.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  photos: CreatePhotoDto[];
}
