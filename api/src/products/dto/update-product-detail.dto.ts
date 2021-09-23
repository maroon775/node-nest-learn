import { IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateProductDetailDto {
  @IsOptional()
  @IsString()
  @MaxLength(45)
  readonly dimension: string;

  @IsOptional()
  @IsNumber()
  readonly weight: number;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  readonly manufacturer: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  readonly origin: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  readonly partNumber: string;
}
