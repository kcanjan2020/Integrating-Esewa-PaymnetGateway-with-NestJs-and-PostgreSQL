import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentMethod } from 'src/constants/payment.method';
import { PaymentStatus } from 'src/constants/payment.status';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @Transform((v) => new Date(v.value))
  @IsDate()
  purchaseDate: Date;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  discountPercentage?: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  productDeliveryCharge?: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  productServiceCharge?: number;

  @IsOptional()
  @IsNumber()
  @Transform((v) => Number(v.value))
  taxAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => Number(v.value))
  totalPrice: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
