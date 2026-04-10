import { Column, Entity } from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @Column({ primary: true, type: 'uuid' })
  id: string;
  @Column({ type: 'varchar', length: 30, unique: true })
  document: string;
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;
  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  phone: string;
  @Column({ type: 'boolean', default: true })
  active: boolean;
}
