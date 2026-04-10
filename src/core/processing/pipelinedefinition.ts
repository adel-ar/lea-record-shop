import { Processor } from './processor';
import { TaskPayload } from './task.type';

export type PipelineDefinition<TPayload extends TaskPayload = TaskPayload> = {
  taskType: string;
  processors: Processor<TPayload>[];
};
