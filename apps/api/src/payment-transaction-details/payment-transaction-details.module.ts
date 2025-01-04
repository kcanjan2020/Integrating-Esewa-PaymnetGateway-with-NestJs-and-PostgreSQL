import { Module } from '@nestjs/common';
import { PaymentTransactionDetailsService } from './payment-transaction-details.service';
import { PaymentTransactionDetailsController } from './payment-transaction-details.controller';
@Module({
  controllers: [PaymentTransactionDetailsController],
  providers: [PaymentTransactionDetailsService],
})
export class PaymentTransactionDetailsModule {}
