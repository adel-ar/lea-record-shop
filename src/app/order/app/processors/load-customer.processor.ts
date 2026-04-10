import { Injectable } from '@nestjs/common';
import { Processor } from '../../../../core/processing/processor';
import { PlaceOrderPayload } from 'src/app/order/app/tasks/place-order.task';

import { ExecutionContext } from '../../../../core/processing/execution-context';
import { CustomerRepository } from 'src/app/customer/infra/customer.repository';

@Injectable()
export class LoadCustomerProcessor implements Processor<PlaceOrderPayload> {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const { customerId } = context.task.payload;
    const customer = await this.customerRepository.find(customerId);
    if (!customer) throw new Error('customer not foud');
    if (!customer.canPlaceOrder())
      throw new Error('Customer cannot place order');
    context.set('customer', customer);
  }
}
