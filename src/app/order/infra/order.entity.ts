import { Column, Entity } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @Column({ primary: true, type: 'uuid' })
  id: string;

  @Column()
  customerId: string;
  @Column()
  catalogId: string;
  @Column()
  quantity: number;
  @Column()
  orderedAt: Date;
  @Column()
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  unitPrice: { amount: number; currency: string } | null;
  @Column({ type: 'jsonb', nullable: true })
  subtotal: { amount: number; currency: string } | null;
  @Column({ type: 'jsonb', nullable: true })
  discount: { amount: number; currency: string } | null;
  @Column({ type: 'jsonb', nullable: true })
  total: { amount: number; currency: string } | null;

  @Column({ nullable: true })
  paymentStatus: string;

  @Column({ type: 'varchar', nullable: true })
  failureReason: string | null;

  @Column({ type: 'varchar', nullable: true })
  queueJobId: string | null;
}
