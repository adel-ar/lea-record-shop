import { Task } from '../processing/task.type';

export abstract class TaskQueue {
  abstract enqueue(task: Task): Promise<{ jobId: string }>;
}
