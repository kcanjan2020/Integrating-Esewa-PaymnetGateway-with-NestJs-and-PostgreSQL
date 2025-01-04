import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentTransactionDetailDto } from './create-payment-transaction-detail.dto';

export class UpdatePaymentTransactionDetailDto extends PartialType(
  CreatePaymentTransactionDetailDto,
) {}
