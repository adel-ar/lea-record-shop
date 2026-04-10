import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CustomerRepository } from 'src/app/customer/infra/customer.repository';
import { CatalogRepository } from 'src/app/catalog/infra/catalog.repository';
import { OrderReadModelRepository } from './order-read-model.repository';

@Injectable()
export class OrderProjectionService {
  constructor(
    private readonly porderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly catalogRepository: CatalogRepository,
    private readonly readModelRepository: OrderReadModelRepository,
  ) {}
  async project(orderId: string) {
    const order = await this.porderRepository.get(orderId);
    const customer = await this.customerRepository.find(
      order.toJson().customerId,
    );
    const catalog = await this.catalogRepository.findById(
      order.toJson().catalogId,
    );
    const pricing = order.toJson().pricing;
    await this.readModelRepository.upsert({
      orderId: order.id,
      customerId: customer?.id as string,
      customerName: customer?.fullName as string,
      customerDocument: customer?.document as string,

      catalogId: catalog?.id as string,
      catalogName: catalog?.name as string,
      artist: catalog?.artist as string,

      quantity: order.toJson().quantity,
      totalAmount: pricing?.total.amount ?? 0,
      currency: pricing?.total.currency ?? 'BRL',

      status: order.status,
      orderedAt: order.toJson().orderedAt,
    });
  }
}
