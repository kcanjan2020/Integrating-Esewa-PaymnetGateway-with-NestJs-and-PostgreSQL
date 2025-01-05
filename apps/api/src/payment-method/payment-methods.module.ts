import { Module } from '@nestjs/common';
import { PaymentMethodsController } from './payment-methods.controller';
import { EsewaService } from './esewa-payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransactionDetail } from 'src/payment-transaction-details/entities/payment-transaction-detail.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTransactionDetail, OrderItem])],
  controllers: [PaymentMethodsController],
  providers: [EsewaService],
})
export class PaymentMethodsModule {}
