import { Injectable } from '@nestjs/common';
import { Processor } from 'src/core/processing/processor';
import { PlaceOrderPayload } from '../tasks/place-order.task';
import { ExecutionContext } from 'src/core/processing/execution-context';
import { Money } from 'src/app/common/money';
import { Pricing } from 'src/app/common/pricing';

@Injectable()
export class ApplyDiscountProcessor implements Processor<PlaceOrderPayload> {
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const pricing = context.get<Pricing>('pricing');
    if (!pricing) return;
    const { quantity } = context.task.payload;
    let updatedPricing = pricing;
    if (quantity >= 5) {
      updatedPricing = pricing.applyPercentageDiscount(5);
    }
    context.set('pricing', updatedPricing);
  }
}
