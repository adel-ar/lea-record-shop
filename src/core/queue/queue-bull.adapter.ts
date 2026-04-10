import { Injectable } from '@nestjs/common';
import { TaskQueue } from './queue.port';
import { Task } from '../processing/task.type';
import { InjectQueue } from '@nestjs/bullmq';
import { ORDER_JOB_NAME, ORDER_QUEUE } from './queue.tokens';
import { Queue } from 'bullmq';
@Injectable()
export class BullTaskQueue implements TaskQueue {
  constructor(@InjectQueue(ORDER_QUEUE) private readonly queue: Queue) {}
  async enqueue(task: Task) {
    const job = await this.queue.add(ORDER_JOB_NAME, task, {
      attempts: 3,
      removeOnComplete: 1000,
      removeOnFail: 1000,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      jobId: `${task.metadata?.orderId}.${Date.now()}`,
    });
    return { jobId: String(job.id) };
  }
}
