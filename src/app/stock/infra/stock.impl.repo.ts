import { RedisService } from 'src/infra/redis/redis.service';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { StockRepository } from './stock.repository';

@Injectable()
export class RedisStockRepository implements StockRepository {
  constructor(private readonly redisService: RedisService) {}
  genKey(catalogId) {
    return `stock:reservetion:${catalogId}`;
  }
  async reserve(catalogId: string, quantity: number): Promise<boolean> {
    const key = this.genKey(catalogId);
    const result = await this.redisService.raw.eval(
      `
            local stock = tonumber(redis.call("GET",KEYS[1]) or "0")

            if stock < tonumber(ARGV[1]) then
                return 0
            end
            redis.call("DECRBY", KEYS[1], ARGV[1])
            return 1
        `,
      1,
      key,
      quantity,
    );
    return result === 1;
  }
  async release(catalogId: string, quantity: number): Promise<void> {
    const key = this.genKey(catalogId);
    await this.redisService.raw.incrby(key, quantity);
  }
  async getAvailable(catalogId: string): Promise<number> {
    const key = this.genKey(catalogId);
    const value = await this.redisService.raw.get(key);
    return value ? Number(value) : 0;
  }
  async initialize(catalogId: string, quantity: number): Promise<void> {
    const key = this.genKey(catalogId);
    await this.redisService.raw.set(key, quantity);
  }
}
