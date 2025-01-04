import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './payment-methods.controller';
import { EsewaService } from './esewa-payment.service';

@Module({
  controllers: [PaymentMethodsController],
  providers: [EsewaService],
})
export class PaymentMethodsModule {}
