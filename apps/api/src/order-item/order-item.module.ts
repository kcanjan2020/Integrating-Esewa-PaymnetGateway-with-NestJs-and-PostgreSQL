import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransactionDetail } from 'src/payment-transaction-details/entities/payment-transaction-detail.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, PaymentTransactionDetail])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
