import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTransactionDetailsController } from './payment-transaction-details.controller';
import { PaymentTransactionDetailsService } from './payment-transaction-details.service';

describe('PaymentTransactionDetailsController', () => {
  let controller: PaymentTransactionDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTransactionDetailsController],
      providers: [PaymentTransactionDetailsService],
    }).compile();

    controller = module.get<PaymentTransactionDetailsController>(
      PaymentTransactionDetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
