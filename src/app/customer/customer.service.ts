import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './infra/customer.repository';
import { Customer } from './domain/customer';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}
  async insert(body) {
    const payload = Customer.create(body);
    const saved = await this.customerRepo.persiste(payload);
    if (!saved) throw new Error('erro insert');
    return saved;
  }
  async update(body) {
    const payload = Customer.rehydrate(body);
    const saved = await this.customerRepo.persiste(payload);
    if (!saved) throw new Error('erro update');
    return saved;
  }
  async list() {
    return await this.customerRepo.list();
  }
  async get(id: string) {
    return await this.customerRepo.find(id);
  }
}
