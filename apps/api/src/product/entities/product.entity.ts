import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ type: 'text' })
  description: string;

  @Column('bigint')
  price: number;

  @Column({ nullable: true })
  discountPercentage: number;

  @Column({ type: 'bigint', nullable: true })
  productDeliveryCharge: number;

  @Column({ nullable: true })
  productServiceCharge: number;

  @Column({ type: 'bigint' })
  totalPrice: number;

  @Column({ type: 'bigint' })
  stock: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
