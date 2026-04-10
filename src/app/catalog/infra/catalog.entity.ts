import { Money } from 'src/app/common/money';
import { Column, Entity } from 'typeorm';

@Entity('catalogs')
export class CatalogEntity {
  @Column({ primary: true, type: 'uuid' }) id: string;
  @Column()
  name: string;
  @Column()
  artist: string;
  @Column()
  releaseYear: number;
  @Column()
  style: string;
  @Column()
  quantity: number;
  @Column({ type: 'jsonb' })
  price: { amount: number; currency: string };
  @Column()
  perOrder?: number;
}
