import { ExecutionContext } from './execution-context';
import { TaskPayload } from './task.type';

export interface Processor<TPayload extends TaskPayload = TaskPayload> {
  execute(context: ExecutionContext<TPayload>): Promise<void>;
}
