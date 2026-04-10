import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from 'src/app/customer/infra/customer.entity';
import { Customer } from '../domain/customer';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class TypeOrmCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repo: Repository<CustomerEntity>,
  ) {}
  async find(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }
  async findByEmail(email: string) {
    const entity = await this.repo.findOne({ where: { email } });
    return entity ? CustomerMapper.toDomain(entity) : null;
  }
  async persiste(customer: Customer) {
    const saved = await this.repo.save(CustomerMapper.toPersistence(customer));
    return CustomerMapper.toDomain(saved);
  }
  async list() {
    const entities = await this.repo.find();
    return entities.flatMap((entity) => CustomerMapper.toDomain(entity));
  }
}
