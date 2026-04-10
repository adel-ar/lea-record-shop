import { Global, Module } from '@nestjs/common';
import { PipelineRegistry } from './pipeline.registry';
import { ProcessingRuntime } from './processor.runtime';

@Global()
@Module({
  providers: [PipelineRegistry, ProcessingRuntime],
  exports: [PipelineRegistry, ProcessingRuntime],
})
export class ProcessingModule {}
