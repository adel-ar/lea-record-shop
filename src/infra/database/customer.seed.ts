import { Injectable } from '@nestjs/common';
import { Customer } from 'src/app/customer/domain/customer';
import { CustomerRepository } from 'src/app/customer/infra/customer.repository';
import { v4 as uuid } from 'uuid';
@Injectable()
export class CustomerSeed {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async run() {
    const existing = await this.customerRepository.list();

    if (existing.length > 0) {
      return;
    }

    const customer1 = Customer.create({
      document: '12325678900',
      fullName: 'Gabriel Adelar',
      birthDate: new Date('1998-05-12'),
      email: 'gabriel@example.com',
      phone: '+55 11 99999-9999',
      active: true,
    });
    const customer2 = Customer.create({
      document: '98765432100',
      fullName: 'Maria Silva',
      birthDate: new Date('1995-03-10'),
      email: 'maria@example.com',
      phone: '+55 11 98888-8888',
      active: false,
    });

    await this.customerRepository.saveMany([customer1, customer2]);
  }
}
