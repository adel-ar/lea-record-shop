import { Injectable, OnModuleInit } from '@nestjs/common';
import { PipelineRegistry } from 'src/core/processing/pipeline.registry';
import { LoadCustomerProcessor } from '../processors/load-customer.processor';
import { ReserveStockProcessor } from '../processors/reserve-stock.processor';
import { PersistOrderProcessor } from '../processors/persisti-order.processor';
import { PLACE_ORDER_TASK } from 'src/app/order/app/tasks/place-order.task';
import { LoadCalogItemProcessor } from '../processors/load-catalog.processor';
import { ValidateOrderQuantityProcessor } from '../processors/load-order-quantity.processor';
import { CalculatePricingProcessor } from '../processors/calculate-pricing.processor';
import { ApplyDiscountProcessor } from '../processors/apply-discount.processor';
import { PublishOrderCreatedProcessor } from '../processors/public-order.processor';
import { LoadOrderProcessor } from '../processors/load-order.processor';
import { ProjectOrderReadModelProcessor } from '../processors/projection-order-read.procesor';

@Injectable()
export class OrderPipelineRegistry implements OnModuleInit {
  constructor(
    private readonly registry: PipelineRegistry,
    private readonly loadCustomerProcessor: LoadCustomerProcessor,
    private readonly loadCalogItemProcessr: LoadCalogItemProcessor,
    private readonly loadOrder: LoadOrderProcessor,
    private readonly reserveStockProcessor: ReserveStockProcessor,
    private readonly persistOrderProcessor: PersistOrderProcessor,
    private readonly calculatePricingProcessor: CalculatePricingProcessor,
    private readonly validateOrderQuantityProcessor: ValidateOrderQuantityProcessor,
    private readonly applyDiscountProcessor: ApplyDiscountProcessor,
    private readonly publishOrderCreatedProcessor: PublishOrderCreatedProcessor,
    private readonly projectionReadModelOrder: ProjectOrderReadModelProcessor,
  ) {}

  onModuleInit() {
    this.registry.registrer({
      taskType: PLACE_ORDER_TASK,
      processors: [
        this.loadOrder,
        this.loadCustomerProcessor,
        this.loadCalogItemProcessr,
        this.validateOrderQuantityProcessor,
        this.reserveStockProcessor,
        this.calculatePricingProcessor,
        this.applyDiscountProcessor,
        this.persistOrderProcessor,
        this.projectionReadModelOrder,
        this.publishOrderCreatedProcessor,
      ],
    });
  }
}
