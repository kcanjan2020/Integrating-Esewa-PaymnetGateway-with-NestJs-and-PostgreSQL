import { Injectable } from '@nestjs/common';
import { CreatePaymentTransactionDetailDto } from './dto/create-payment-transaction-detail.dto';
import { UpdatePaymentTransactionDetailDto } from './dto/update-payment-transaction-detail.dto';

@Injectable()
export class PaymentTransactionDetailsService {
  create(createPaymentTransactionDetailDto: CreatePaymentTransactionDetailDto) {
    return 'This action adds a new paymentTransactionDetail';
  }

  findAll() {
    return `This action returns all paymentTransactionDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentTransactionDetail`;
  }

  update(
    id: number,
    updatePaymentTransactionDetailDto: UpdatePaymentTransactionDetailDto,
  ) {
    return `This action updates a #${id} paymentTransactionDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentTransactionDetail`;
  }
}
