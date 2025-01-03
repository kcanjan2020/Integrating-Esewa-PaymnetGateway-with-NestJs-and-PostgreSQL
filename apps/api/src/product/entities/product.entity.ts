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
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'bigint' })
  price: number;

  @Column({ type: 'bigint', nullable: true })
  product_delivery_charge: number;

  @Column({ nullable: true })
  discountPercentage: number;

  @Column({ type: 'bigint' })
  stock: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  image: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
