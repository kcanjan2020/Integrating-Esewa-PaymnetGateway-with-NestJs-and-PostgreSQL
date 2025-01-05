import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { generateEsewaSignature } from 'src/payment-method/esewa-verification';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly configService: ConfigService,
  ) {}
  async createOrder(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = new OrderItem();
    orderItem.productId = createOrderItemDto.productId;
    orderItem.purchaseDate = new Date();
    orderItem.productName = createOrderItemDto.productName;
    orderItem.price = createOrderItemDto.price;
    orderItem.quantity = createOrderItemDto.quantity;
    orderItem.discountPercentage = createOrderItemDto.discountPercentage;
    orderItem.productDeliveryCharge = createOrderItemDto.productDeliveryCharge;
    orderItem.productServiceCharge = createOrderItemDto.productServiceCharge;
    orderItem.paymentMethod = createOrderItemDto.paymentMethod;
    orderItem.status = createOrderItemDto.status;
    orderItem.totalPrice =
      orderItem.price +
      orderItem.productDeliveryCharge +
      orderItem.productServiceCharge +
      orderItem.taxAmount;

    try {
      const orderItem = await this.orderItemRepository.save(createOrderItemDto);
      const signature = generateEsewaSignature(
        `total_amount=${orderItem.totalPrice},transaction_uuid=${orderItem.id},product_code=${this.configService.get('ESEWA_PRODUCT_CODE')}`,
      );
      if (orderItem.paymentMethod === 'esewa') {
        const esewaFormData = {
          amount: orderItem.price,
          failure_url: this.configService.get('ESEWA_FAILURE_URL'),
          product_delivery_charge: orderItem.productDeliveryCharge,
          product_service_charge: orderItem.productServiceCharge,
          product_code: this.configService.get('ESEWA_PRODUCT_CODE'),
          signature: signature,
          signed_field_names: 'total_amount,transaction_uuid,product_code',
          success_url: this.configService.get('ESEWA_SUCCESS_URL'),
          tax_amount: orderItem.taxAmount,
          total_amount: orderItem.totalPrice,
          transaction_uuid: orderItem.id,
        };
        console.log('esewaFormData', esewaFormData);
        return {
          messgage: 'Order Created Successfully',
          orderItem,
          esewaFormData,
          paymentMethod: 'esewa',
        };
      }
    } catch (error) {
      return {
        suucess: false,
        message: error ? error.message : 'Order Not Found',
      };
    }
  }
}
