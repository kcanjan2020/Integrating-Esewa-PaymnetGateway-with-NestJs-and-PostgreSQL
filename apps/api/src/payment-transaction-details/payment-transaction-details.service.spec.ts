import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTransactionDetailsService } from './payment-transaction-details.service';

describe('PaymentTransactionDetailsService', () => {
  let service: PaymentTransactionDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentTransactionDetailsService],
    }).compile();

    service = module.get<PaymentTransactionDetailsService>(
      PaymentTransactionDetailsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
