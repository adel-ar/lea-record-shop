import { Injectable } from '@nestjs/common';
import { PipelineDefinition } from './pipelinedefinition';
import { TaskPayload } from './task.type';

@Injectable()
export class PipelineRegistry {
  private readonly pipelines = new Map<string, PipelineDefinition<any>>();
  registrer<TPayload extends TaskPayload>(
    pipeline: PipelineDefinition<TPayload>,
  ): void {
    if (this.pipelines.has(pipeline.taskType)) {
      throw new Error(
        `Pipeline already registered for task type: ${pipeline.taskType}`,
      );
    }
    this.pipelines.set(pipeline.taskType, pipeline);
  }
  resolve<TPayload extends TaskPayload>(
    taskType: string,
  ): PipelineDefinition<TPayload> {
    const pipeline = this.pipelines.get(taskType);
    if (!pipeline) {
      throw new Error(`Pipeline not found for task type: ${taskType}`);
    }
    return pipeline as PipelineDefinition<TPayload>;
  }
}
