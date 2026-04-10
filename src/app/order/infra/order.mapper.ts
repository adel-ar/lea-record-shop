import { OrderEntity } from 'src/app/order/infra/order.entity';
import { Money } from 'src/app/common/money';
import { Pricing } from 'src/app/common/pricing';
import { Order } from '../domain/order.aggregate';
import { OrderStatus, PaymentStatus } from '../domain/order.types';

export class OrderMapper {
  static toDomain(entity: OrderEntity): Order {
    let pricing;
    if (entity.unitPrice && entity.total && entity.subtotal && entity.discount)
      pricing = Pricing.rehydrate({
        unitPrice: new Money(
          entity.unitPrice.amount,
          entity.unitPrice.currency,
        ),
        subtotal: new Money(entity.subtotal.amount, entity.subtotal.currency),
        discount: new Money(entity.discount.amount, entity.discount.currency),
        total: new Money(entity.total.amount, entity.total.currency),
      });

    return Order.rehydrate({
      id: entity.id,
      customerId: entity.customerId,
      catalogId: entity.catalogId,
      quantity: entity.quantity,
      orderedAt: entity.orderedAt,
      status: entity.status as OrderStatus,
      pricing,
      failureReason: entity.failureReason ?? null,
      queueJobId: entity.queueJobId ?? null,
      paymentStatus: (entity.paymentStatus as PaymentStatus) ?? null,
    });
  }
  static toPersistence(domain: Order): OrderEntity {
    const raw = domain.toJson();
    const entity = new OrderEntity();
    entity.id = domain.id!;
    entity.customerId = raw.customerId;
    entity.catalogId = raw.catalogId;
    entity.quantity = raw.quantity;
    entity.orderedAt = raw.orderedAt;
    entity.status = raw.status;

    entity.failureReason = raw.failureReason ? raw.failureReason : null;

    entity.unitPrice = raw.pricing
      ? {
          amount: raw.pricing.unitPrice.amount,
          currency: raw.pricing.unitPrice.currency,
        }
      : null;

    entity.subtotal = raw.pricing
      ? {
          amount: raw.pricing.subtotal.amount,
          currency: raw.pricing.subtotal.currency,
        }
      : null;

    entity.discount = raw.pricing
      ? {
          amount: raw.pricing.discount.amount,
          currency: raw.pricing.discount.currency,
        }
      : null;

    entity.total = raw.pricing
      ? {
          amount: raw.pricing.total.amount,
          currency: raw.pricing.total.currency,
        }
      : null;
    return entity;
  }
}
