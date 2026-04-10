import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { OrderEntity } from 'src/app/order/infra/order.entity';
import { Order } from '../domain/order.aggregate';
import { OrderMapper } from './order.mapper';

@Injectable()
export class TypeOrmOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}
  async get(id: string): Promise<Order> {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new Error('order dont found');
    return OrderMapper.toDomain(order);
  }
  async listByCustomer(customerId: string): Promise<Order[]> {
    const orders = await this.repo.find({ where: { customerId } });
    if (!orders) throw new Error('order dont found');
    return orders.flatMap((order) => OrderMapper.toDomain(order));
  }
  async persiste(order: Order) {
    const saved = await this.repo.save(OrderMapper.toPersistence(order));
    const ret = OrderMapper.toDomain(saved);
    return ret;
  }
}
