import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOrderRepository } from 'src/app/order/infra/other.impl.repo';
import { OrderRepository } from 'src/app/order/infra/order.repository';
import { OrderEntity } from 'src/app/order/infra/order.entity';
import { LoadCustomerProcessor } from 'src/app/order/app/processors/load-customer.processor';
import { ReserveStockProcessor } from 'src/app/order/app/processors/reserve-stock.processor';
import { PersistOrderProcessor } from 'src/app/order/app/processors/persisti-order.processor';
import { OrderPipelineRegistry } from './app/tasks/Order.registry';
import { CustomerModule } from '../customer/customer.module';
import { StockModule } from '../stock/infra/stock.module';
import { LoadCalogItemProcessor } from 'src/app/order/app/processors/load-catalog.processor';
import { CatalogModule } from '../catalog/catalog.module';
import { OrderControler } from './order.controller';
import { OrderService } from './order.service';
import { CalculatePricingProcessor } from './app/processors/calculate-pricing.processor';
import { ValidateOrderQuantityProcessor } from './app/processors/load-order-quantity.processor';
import { ApplyDiscountProcessor } from './app/processors/apply-discount.processor';
import { PublishOrderCreatedProcessor } from './app/processors/public-order.processor';
import { BullModule } from '@nestjs/bullmq';
import { ORDER_QUEUE } from '../../core/queue/queue.tokens';
import { BullTaskQueue } from 'src/core/queue/queue-bull.adapter';
import { OrderWorker } from './app/order.work';
import { TaskQueue } from 'src/core/queue/queue.port';
import { LoadOrderProcessor } from './app/processors/load-order.processor';
import { OrderProjectionService } from './infra/order-projection.service';
import { OrderReadModelEntity } from './infra/order-read-model.entity';
import { ProjectOrderReadModelProcessor } from './app/processors/projection-order-read.procesor';
import { OrderReadModelRepository } from './infra/order-read-model.repository';
import { ListOrdersQuery } from './app/read-model/list-orders.query';
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderReadModelEntity]),
    CustomerModule,
    StockModule,
    CatalogModule,
    BullModule.registerQueue({
      name: ORDER_QUEUE,
    }),
  ],
  providers: [
    OrderProjectionService,
    ListOrdersQuery,
    {
      provide: OrderRepository,
      useClass: TypeOrmOrderRepository,
    },
    {
      provide: TaskQueue,
      useClass: BullTaskQueue,
    },
    { provide: OrderReadModelRepository, useClass: OrderReadModelRepository },
    OrderWorker,
    OrderService,
    LoadOrderProcessor,
    LoadCalogItemProcessor,
    LoadCustomerProcessor,
    ReserveStockProcessor,
    PersistOrderProcessor,
    OrderPipelineRegistry,
    ValidateOrderQuantityProcessor,
    CalculatePricingProcessor,
    ApplyDiscountProcessor,
    PublishOrderCreatedProcessor,
    ProjectOrderReadModelProcessor,
  ],
  controllers: [OrderControler],
  exports: [OrderRepository],
})
export class OrderModule {}
