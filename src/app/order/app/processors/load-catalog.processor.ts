import { PlaceOrderPayload } from 'src/app/order/app/tasks/place-order.task';
import { Processor } from '../../../../core/processing/processor';
import { Injectable } from '@nestjs/common';
import { CatalogRepository } from 'src/app/catalog/infra/catalog.repository';
import { ExecutionContext } from '../../../../core/processing/execution-context';

@Injectable()
export class LoadCalogItemProcessor implements Processor<PlaceOrderPayload> {
  constructor(private readonly catalogRepository: CatalogRepository) {}
  async execute(context: ExecutionContext<PlaceOrderPayload>) {
    const { catalogId } = context.task.payload;
    const item = await this.catalogRepository.findById(catalogId);
    if (!item) throw new Error(`Catalog item not found`);
    context.set('catalogItem', item);
  }
}
