import { Provider } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const host = configService.get<string>('REDIS_HOST', 'localhost');
    const port = configService.get<number>('REDIS_PORT', 6379);

    const client = new Redis({
      host,
      port,
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    });
    return client;
  },
};
