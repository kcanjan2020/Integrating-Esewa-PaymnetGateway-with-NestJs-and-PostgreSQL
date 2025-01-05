import { Injectable } from '@nestjs/common';
import { verifyEsewaPayment } from './esewa-verification';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTransactionDetail } from 'src/payment-transaction-details/entities/payment-transaction-detail.entity';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { PaymentStatus } from 'src/constants/payment.status';

@Injectable()
export class EsewaService {
  constructor(
    @InjectRepository(PaymentTransactionDetail)
    private readonly paymentRepository: Repository<PaymentTransactionDetail>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}
  async completeEsewaPayment(data: string) {
    try {
      const transactionAndVerificationData = await verifyEsewaPayment(data);

      const orderItem = await this.orderItemRepository.findOne({
        where: {
          id: transactionAndVerificationData.verificationResponse
            .transaction_uuid,
        },
      });
      if (!orderItem) {
        return {
          message: 'Order not found',
        };
      }

      const paymentTransactionDetail = new PaymentTransactionDetail();
      paymentTransactionDetail.transactionId =
        transactionAndVerificationData.decodedData.transaction_code;
      paymentTransactionDetail.pidx =
        transactionAndVerificationData.decodedData.transaction_code;
      paymentTransactionDetail.productId =
        transactionAndVerificationData.verificationResponse.transaction_uuid;
      paymentTransactionDetail.amount =
        transactionAndVerificationData.verificationResponse.total_amount;
      paymentTransactionDetail.dataFromVerificationReq =
        transactionAndVerificationData;
      paymentTransactionDetail.apiQueryFromUser = data;
      paymentTransactionDetail.paymentGateway = 'esewa';
      paymentTransactionDetail.status = 'success';
      await this.paymentRepository.save(paymentTransactionDetail);

      console.log('Hellooo');

      await this.orderItemRepository.update(
        {
          id: transactionAndVerificationData.verificationResponse
            .transaction_uuid,
        },
        { status: PaymentStatus.SUCCESS },
      );

      return {
        message: 'Payment Successful',
      };
    } catch (error) {
      console.log('error==>', error);
    }
  }
}
