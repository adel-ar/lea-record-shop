import {
  Inject,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}
  async onModuleInit() {
    if (this.client.status !== 'ready') {
      await this.client.connect();
    }
  }
  async onModuleDestroy() {
    await this.client.quit();
  }
  get raw() {
    return this.client;
  }
}
