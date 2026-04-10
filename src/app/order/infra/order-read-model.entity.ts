import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_read_model')
export class OrderReadModelEntity {
  @PrimaryColumn('uuid')
  orderId: string;
  @Column()
  customerId: string;
  @Column()
  customerName: string;
  @Column()
  customerDocument: string;
  @Column()
  catalogId: string;
  @Column()
  catalogName: string;
  @Column()
  artist: string;
  @Column()
  quantity: number;
  @Column('decimal')
  totalAmount: number;
  @Column()
  currency: string;
  @Column()
  status: string;
  @Column()
  orderedAt: Date;
}
