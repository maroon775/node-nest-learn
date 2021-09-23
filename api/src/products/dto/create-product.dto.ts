import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { CreateProductDetailDto } from './create-product-detail.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsObject()
  readonly productDetail: CreateProductDetailDto;
}
