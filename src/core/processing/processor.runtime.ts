import { Injectable, Logger } from '@nestjs/common';
import { PipelineRegistry } from './pipeline.registry';
import { Task, TaskPayload } from './task.type';
import { ExecutionContext } from './execution-context';

@Injectable()
export class ProcessingRuntime {
  private readonly logger = new Logger(ProcessingRuntime.name);
  constructor(private readonly pipelineRegistry: PipelineRegistry) {}
  async execute<TPayload extends TaskPayload>(
    task: Task<TPayload>,
  ): Promise<ExecutionContext<TPayload>> {
    const pipeline = this.pipelineRegistry.resolve<TPayload>(task.type);
    const context = new ExecutionContext(task);
    this.logger.log(`Executing task: ${task.type}`);
    for (const processor of pipeline.processors) {
      await processor.execute(context);
    }
    return context;
  }
}
