import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDetailDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  readonly dimension: string;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  readonly manufacturer: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  readonly origin: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  readonly partNumber: string;
}
