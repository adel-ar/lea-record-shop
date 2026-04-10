import { Task, TaskPayload } from './task.type';

export class ExecutionContext<TPayload extends TaskPayload = TaskPayload> {
  private readonly state = new Map<string, unknown>();
  constructor(public readonly task: Task<TPayload>) {}
  set<T>(key: string, value: T) {
    this.state.set(key, value);
  }
  get<T>(key: string): T | undefined {
    return this.state.get(key) as T | undefined;
  }
  has(key: string) {
    return this.state.has(key);
  }
  remove(key: string) {
    this.state.delete(key);
  }
  toObject(): Record<string, unknown> {
    return Object.fromEntries(this.state.entries());
  }
}
