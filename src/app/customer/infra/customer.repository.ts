import { Customer } from '../domain/customer';

export abstract class CustomerRepository {
  abstract find(id: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract persiste(customer: Customer): Promise<Customer>;
  abstract list(): Promise<Customer[]>;
  abstract saveMany(customer: Customer[]): Promise<Customer[]>;
}
