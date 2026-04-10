import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderReadModelEntity } from './order-read-model.entity';

@Injectable()
export class OrderReadModelRepository {
  constructor(
    @InjectRepository(OrderReadModelEntity)
    private readonly repo: Repository<OrderReadModelEntity>,
  ) {}
  async upsert(data: Partial<OrderReadModelEntity>) {
    await this.repo.upsert(data, ['orderId']);
  }
  async list(filters?: {
    customerId?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const qb = this.repo.createQueryBuilder('o');
    if (filters?.customerId) {
      qb.andWhere('o.customerId = :customerId', {
        customerId: filters.customerId,
      });
    }
    if (filters?.startDate) {
      qb.andWhere('o.orderedAt >= :startDate', {
        startDate: filters.startDate,
      });
    }
    if (filters?.endDate) {
      qb.andWhere('o.orderedAt <= :endDate', { endDate: filters.endDate });
    }
    return qb.orderBy('o.orderedAt', 'DESC').getMany();
  }
}
