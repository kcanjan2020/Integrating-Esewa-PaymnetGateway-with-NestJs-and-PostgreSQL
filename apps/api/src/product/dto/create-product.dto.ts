import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import e from 'express';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  discountPercentage: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  image?: any;

  @IsNotEmpty()
  @IsBoolean()
  @Transform((v) => {
    if (typeof v.value === 'string') {
      if (v.value === 'false') {
        return false;
      } else if (v.value === 'true') {
        return true;
      }
    }
    return Boolean(v.value);
  })
  status: boolean;
}
