import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { UpdateProductDetailDto } from './update-product-detail.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly quantity: number;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsObject()
  readonly productDetail: UpdateProductDetailDto;
}
