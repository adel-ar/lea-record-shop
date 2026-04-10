import { Injectable } from '@nestjs/common';
import { Processor } from 'src/core/processing/processor';
import { PlaceOrderPayload } from '../tasks/place-order.task';
import { ExecutionContext } from 'src/core/processing/execution-context';
import { Pricing } from 'src/app/common/pricing';
import { Catalog } from 'src/app/catalog/domain/catalog';

@Injectable()
export class CalculatePricingProcessor implements Processor<PlaceOrderPayload> {
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const catalogItem = context.get<Catalog>('catalogItem');
    if (!catalogItem) throw new Error('error...');
    const { quantity } = context.task.payload;
    const pricing = Pricing.fromUnitPrice(catalogItem.price, quantity);
    context.set('pricing', pricing);
  }
}
