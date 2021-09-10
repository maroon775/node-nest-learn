import { IsNotEmpty, IsInt, IsNumber, IsString } from 'class-validator';

export class createCatDTO {
  @IsNotEmpty()
  @IsInt()
  readonly age: number;

  @IsString()
  readonly color: string;
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly weight: number;
}
