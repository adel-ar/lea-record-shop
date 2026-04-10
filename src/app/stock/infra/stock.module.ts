import { Module } from '@nestjs/common';
import { StockRepository } from './stock.repository';
import { RedisStockRepository } from './stock.impl.repo';

@Module({
  providers: [
    {
      provide: StockRepository,
      useClass: RedisStockRepository,
    },
  ],
  exports: [StockRepository],
})
export class StockModule {}
