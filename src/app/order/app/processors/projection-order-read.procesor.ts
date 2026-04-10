import { Injectable } from '@nestjs/common';
import { Processor } from 'src/core/processing/processor';
import { PlaceOrderPayload } from '../tasks/place-order.task';
import { OrderProjectionService } from '../../infra/order-projection.service';
import { ExecutionContext } from 'src/core/processing/execution-context';

@Injectable()
export class ProjectOrderReadModelProcessor implements Processor<PlaceOrderPayload> {
  constructor(private readonly projectionService: OrderProjectionService) {}
  async execute(context: ExecutionContext<PlaceOrderPayload>): Promise<void> {
    const orderId = context.task.metadata?.orderId;
    if (!orderId) throw new Error('sem order, precisa de um... u.u');
    await this.projectionService.project(orderId);
  }
}
