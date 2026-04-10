import { Injectable } from '@nestjs/common';
import { OrderReadModelRepository } from '../../infra/order-read-model.repository';
import { OrderQueryFieltsProps } from '../../domain/order.types';

@Injectable()
export class ListOrdersQuery {
  constructor(private readonly readModelRepository: OrderReadModelRepository) {}

  async execute(filters?: OrderQueryFieltsProps) {
    return this.readModelRepository.list(filters);
  }
}
