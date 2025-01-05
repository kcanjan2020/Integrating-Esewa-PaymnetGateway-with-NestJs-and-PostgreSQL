import { PaymentMethod } from 'src/constants/payment.method';
import { PaymentStatus } from 'src/constants/payment.status';
import { PaymentTransactionDetail } from 'src/payment-transaction-details/entities/payment-transaction-detail.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  productId: string;

  @Column('date')
  purchaseDate: Date;

  @Column()
  productName: string;

  @Column('bigint')
  price: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  discountPercentage: number;

  @Column({ type: 'bigint', nullable: true })
  productDeliveryCharge: number;

  @Column({ nullable: true })
  productServiceCharge: number;

  @Column({ nullable: true })
  taxAmount: number;

  @Column({ type: 'bigint' })
  totalPrice: number;

  @Column()
  paymentMethod: PaymentMethod;

  @Column({ default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @OneToOne(
    () => PaymentTransactionDetail,
    (paymentTransactionDetail) => paymentTransactionDetail.productId,
  )
  paymentTransactionDetail: PaymentTransactionDetail;
}
