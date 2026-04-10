import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/app/customer/infra/customer.entity';
import { CustomerRepository } from './infra/customer.repository';
import { TypeOrmCustomerRepository } from './infra/customer.impl.repo';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [
    {
      provide: CustomerRepository,
      useClass: TypeOrmCustomerRepository,
    },
    CustomerService,
  ],
  controllers: [CustomerController],
  exports: [CustomerRepository],
})
export class CustomerModule {}
