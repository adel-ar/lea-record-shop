import { Processor } from 'src/core/processing/processor';
import { PlaceOrderPayload } from '../tasks/place-order.task';
import { Injectable } from '@nestjs/common';
import { ExecutionContext } from 'src/core/processing/execution-context';
import { OrderRepository } from '../../infra/order.repository';

@Injectable()
export class LoadOrderProcessor implements Processor<PlaceOrderPayload> {
  constructor(private readonly orderRepo: OrderRepository) {}
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const orderId = context.task.metadata?.orderId;
    if (!orderId) throw new Error('need orderId');
    const order = await this.orderRepo.get(orderId);
    if (!order) throw new Error(`order not fount ${orderId}`);
    context.set('order', order);
  }
}
