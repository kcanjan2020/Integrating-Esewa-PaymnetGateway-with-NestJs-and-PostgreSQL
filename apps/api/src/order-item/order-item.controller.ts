import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemService } from './order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  createOrder(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.createOrder(createOrderItemDto);
  }
}
