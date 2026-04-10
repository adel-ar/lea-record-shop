import { Injectable } from '@nestjs/common';
import { PlaceOrderPayload } from '../tasks/place-order.task';
import { Processor } from 'src/core/processing/processor';
import { ExecutionContext } from 'src/core/processing/execution-context';
import { InvalidOrderStateError } from '../../domain/errors';
import { Catalog } from 'src/app/catalog/domain/catalog';

@Injectable()
export class ValidateOrderQuantityProcessor implements Processor<PlaceOrderPayload> {
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const item = context.get<Catalog>('catalogItem');
    if (!item) {
      throw new InvalidOrderStateError('catlog not found');
    }
    const { quantity } = context.task.payload;
    if (quantity <= 0) {
      throw new InvalidOrderStateError('quantity must be greater than zero');
    }
    if (item.perOrder && quantity > item.perOrder) {
      throw new InvalidOrderStateError('max quantity per order is ');
    }
  }
}
