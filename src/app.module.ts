import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { RedisModule } from './infra/redis/redis.module';

import { CatalogModule } from './app/catalog/catalog.module';
import { OrderModule } from './app/order/order.module';
import { CustomerModule } from './app/customer/customer.module';
import { ProcessingModule } from './core/processing/processing.module';
import { StockModule } from './app/stock/infra/stock.module';
import { BullModule } from '@nestjs/bullmq';
import { BullTaskQueue } from './core/queue/queue-bull.adapter';
import { SeedModule } from './infra/database/seed.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RedisModule,
    CustomerModule,
    CatalogModule,
    OrderModule,
    ProcessingModule,
    StockModule,
    SeedModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
