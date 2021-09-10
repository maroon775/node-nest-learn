import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class creatProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  color?: string;
}
