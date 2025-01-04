import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import e from 'express';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  price: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  discountPercentage: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  productDeliveryCharge: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  productServiceCharge: number;

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
}
