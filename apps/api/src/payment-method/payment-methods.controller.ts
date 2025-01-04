import { Controller, Get, Query } from '@nestjs/common';
import { EsewaService } from './esewa-payment.service';

@Controller('payment')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: EsewaService) {}

  @Get('esewa/success')
  completeEsewaPayment(@Query('data') data: string) {
    return this.paymentMethodsService.completeEsewaPayment(data);
  }
}
