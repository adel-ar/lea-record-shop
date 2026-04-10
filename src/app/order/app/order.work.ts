import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ORDER_QUEUE } from '../../../core/queue/queue.tokens';
import { OrderRepository } from '../infra/order.repository';
import { ProcessingRuntime } from '../../../core/processing/processor.runtime';
import { Job } from 'bullmq';
import { Task } from '../../../core/processing/task.type';
import { OrderStatus } from '../domain/order.types';

@Injectable()
@Processor(ORDER_QUEUE)
export class OrderWorker extends WorkerHost {
  private readonly logger = new Logger(OrderWorker.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly processingRuntime: ProcessingRuntime,
  ) {
    super();
  }
  async process(job: Job<Task, any, string>, token?: string): Promise<any> {
    const task = job.data;
    const order = await this.orderRepository.get(task.metadata?.orderId);
    if (!order) {
      throw new Error(`Order not found: ${task.metadata?.orderId}`);
    }

    if (order.status === OrderStatus.COMPLETED) {
      this.logger.warn(
        `Order ${task.metadata?.orderId} already completed. Skipping.`,
      );
      return;
    }

    if (order.status === OrderStatus.PROCESSING) {
      this.logger.warn(
        `Order ${task.metadata?.orderId} already processing. Skipping duplicate.`,
      );
      return;
    }
    order.markProcessing();
    await this.orderRepository.persiste(order);

    try {
      const res = await this.processingRuntime.execute({
        type: task.type,
        metadata: { orderId: task.metadata?.orderId },
        payload: task.payload,
      });
      return res;
    } catch (error) {
      order.markFailed(
        error instanceof Error ? error.message : 'Unknown error',
      );
      await this.orderRepository.persiste(order);
      throw error;
    }
  }
}
