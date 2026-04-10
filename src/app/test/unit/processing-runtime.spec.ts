import { PipelineRegistry } from '../../../core/processing/pipeline.registry';
import { ProcessingRuntime } from '../../../core/processing/processor.runtime';

describe('ProcessingRuntime', () => {
  let registry: PipelineRegistry;
  let runtime: ProcessingRuntime;
  beforeEach(() => {
    registry = new PipelineRegistry();
    runtime = new ProcessingRuntime(registry);
  });
  it('should execute processors in order', async () => {
    const calls: string[] = [];
    const processorA = {
      execute: jest.fn(async (ctx) => {
        calls.push('A');
        ctx.set('foo', 'bar');
      }),
    };
    const processorB = {
      execute: jest.fn(async (ctx) => {
        calls.push('B');
        expect(ctx.get('foo')).toBe('bar');
      }),
    };
    registry.registrer({
      taskType: 'test-task',
      processors: [processorA, processorB],
    });
    const context = await runtime.execute({ type: 'test-task', payload: {} });
    expect(calls).toEqual(['A', 'B']);
    expect(context.get('foo')).toBe('bar');
  });
  it('should throw when pipeline does not exist', async () => {
    await expect(
      runtime.execute({ type: 'missing-task', payload: {} }),
    ).rejects.toThrow('Pipeline not found');
  });
  it('should stop execution if processos throws', async () => {
    const processorA = {
      execute: jest.fn(async () => {
        throw new Error('processor failed');
      }),
    };
    const processorB = { execute: jest.fn() };
    registry.registrer({
      taskType: 'test-tesk',
      processors: [processorA, processorB],
    });
    await expect(
      runtime.execute({
        type: 'test-tesk',
        payload: {},
      }),
    ).rejects.toThrow('processor failed');
    expect(processorB.execute).not.toHaveBeenCalled();
  });
});
