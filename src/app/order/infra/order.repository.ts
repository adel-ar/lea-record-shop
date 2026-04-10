import { Order } from '../domain/order.aggregate';

export abstract class OrderRepository {
  abstract persiste(customer: Order): Promise<Order>;
  abstract get(id): Promise<Order>;
  abstract listByCustomer(customerId: string): Promise<Order[]>;
}
