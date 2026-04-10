import { Injectable } from '@nestjs/common';
import { PLACE_ORDER_TASK } from './app/tasks/place-order.task';
import { OrderRepository } from './infra/order.repository';
import { TaskQueue } from 'src/core/queue/queue.port';
import { Task } from 'src/core/processing/task.type';
import { Order } from './domain/order.aggregate';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly taskQueue: TaskQueue,
  ) {}
  // fazer o class validator disso
  // CreateOrderInput
  async orderProcessor(body) {
    const orderId = Order.genId();
    const order = Order.createPending({
      id: orderId,
      customerId: body.customerId,
      catalogId: body.catalogId,
      quantity: body.quantity,
    });
    await this.orderRepository.persiste(order);
    const task: Task = {
      type: PLACE_ORDER_TASK,
      payload: {
        customerId: body.customerId,
        catalogId: body.catalogId,
        quantity: body.quantity,
      },
      metadata: { requestedAt: new Date(), orderId, correlationId: orderId },
    };
    const { jobId } = await this.taskQueue.enqueue(task);
    order.attachQueueJob(jobId);
    await this.orderRepository.persiste(order);
    return {
      orderId,
      jobId,
      status: 'queued',
    };
  }
  async get(id: string) {
    return await this.orderRepository.get(id);
  }
  async listByCustomer(customerId: string) {
    return await this.orderRepository.listByCustomer(customerId);
  }
}
