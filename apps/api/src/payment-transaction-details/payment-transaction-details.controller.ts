import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentTransactionDetailsService } from './payment-transaction-details.service';
import { CreatePaymentTransactionDetailDto } from './dto/create-payment-transaction-detail.dto';
import { UpdatePaymentTransactionDetailDto } from './dto/update-payment-transaction-detail.dto';

@Controller('payment-transaction-details')
export class PaymentTransactionDetailsController {
  constructor(
    private readonly paymentTransactionDetailsService: PaymentTransactionDetailsService,
  ) {}

  @Post()
  create(
    @Body()
    createPaymentTransactionDetailDto: CreatePaymentTransactionDetailDto,
  ) {
    return this.paymentTransactionDetailsService.create(
      createPaymentTransactionDetailDto,
    );
  }

  @Get()
  findAll() {
    return this.paymentTransactionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTransactionDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePaymentTransactionDetailDto: UpdatePaymentTransactionDetailDto,
  ) {
    return this.paymentTransactionDetailsService.update(
      +id,
      updatePaymentTransactionDetailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTransactionDetailsService.remove(+id);
  }
}
