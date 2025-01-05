import { OrderItem } from 'src/order-item/entities/order-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PaymentTransactionDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  transactionId: string;

  @Column({ type: 'varchar', unique: true })
  pidx: string;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.paymentTransactionDetail)
  @JoinColumn()
  productId: OrderItem;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'json', nullable: true })
  dataFromVerificationReq: Record<string, any>;

  @Column()
  apiQueryFromUser: string;

  @Column({
    type: 'enum',
    enum: ['khalti', 'esewa', 'connectIps'],
  })
  paymentGateway: 'khalti' | 'esewa' | 'connectIps';

  @Column({
    type: 'enum',
    enum: ['success', 'pending', 'failed'],
    default: 'pending',
  })
  status: 'success' | 'pending' | 'failed';

  @Column({ type: 'timestamp', default: new Date() })
  paymentDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
