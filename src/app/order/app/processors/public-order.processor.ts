import { Injectable } from '@nestjs/common';
import { PlaceOrderPayload } from '../tasks/place-order.task';
import { Processor } from 'src/core/processing/processor';
import { ExecutionContext } from 'src/core/processing/execution-context';

@Injectable()
export class PublishOrderCreatedProcessor implements Processor<PlaceOrderPayload> {
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const order = context.get<any>('order');
    if (!order) return;
    console.log('event: orderCreated', { oderId: order.id });
  }
}
