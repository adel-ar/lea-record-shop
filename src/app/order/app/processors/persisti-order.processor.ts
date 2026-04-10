import { Injectable } from '@nestjs/common';
import { Processor } from '../../../../core/processing/processor';
import { PlaceOrderPayload } from 'src/app/order/app/tasks/place-order.task';
import { OrderRepository } from 'src/app/order/infra/order.repository';
import { ExecutionContext } from '../../../../core/processing/execution-context';
import { Pricing } from 'src/app/common/pricing';
import { Order } from '../../domain/order.aggregate';
@Injectable()
export class PersistOrderProcessor implements Processor<PlaceOrderPayload> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const order = context.get<Order>('order');
    if (!order) throw new Error('orderless');
    const pricing = context.get<Pricing>('pricing');
    if (!pricing) throw Error('Sem preco');

    order.markCompleted(pricing);

    const saved = await this.orderRepository.persiste(order);
    context.set('order', saved);
  }
}
