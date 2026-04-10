import { Injectable } from '@nestjs/common';
import { Processor } from '../../../../core/processing/processor';
import { PlaceOrderPayload } from 'src/app/order/app/tasks/place-order.task';
import { ExecutionContext } from '../../../../core/processing/execution-context';
import { StockRepository } from 'src/app/stock/infra/stock.repository';

@Injectable()
export class ReserveStockProcessor implements Processor<PlaceOrderPayload> {
  constructor(private readonly stockRepository: StockRepository) {}
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const { catalogId, quantity } = context.task.payload;
    const reserved = await this.stockRepository.reserve(catalogId, quantity);
    if (!reserved) {
      throw new Error('Insuficient stock');
    }
    context.set('stockReserved', true);
  }
}
