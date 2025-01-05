import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { EsewaService } from './esewa-payment.service';

@Controller('payment')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: EsewaService) {}

  @Get('esewa/success')
  @Redirect('http://localhost:5173')
  completeEsewaPayment(@Query('data') data: string) {
    return this.paymentMethodsService.completeEsewaPayment(data);
  }
}
