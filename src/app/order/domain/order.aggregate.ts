import { v4 as uuid } from 'uuid';
import { Pricing } from 'src/app/common/pricing';
import { OrderStatus, PaymentStatus } from './order.types';
import { InvalidOrderStateError } from './errors';
export interface OrderProps {
  id: string;
  customerId: string;
  catalogId: string;
  quantity: number;
  orderedAt: Date;
  status: OrderStatus;
  pricing: Pricing | null;
  failureReason?: string | null;
  queueJobId?: string | null;
  paymentStatus?: PaymentStatus;
}
export class Order {
  constructor(private readonly props: OrderProps) {}
  static genId() {
    return uuid();
  }
  get id(): string {
    return this.props.id;
  }
  get status(): string {
    return this.props.status;
  }
  static createPending(input: {
    id: string;
    customerId: string;
    catalogId: string;
    quantity: number;
    orderedAt?: Date;
  }) {
    return new Order({
      id: input.id,
      customerId: input.customerId,
      catalogId: input.catalogId,
      quantity: input.quantity,
      orderedAt: input.orderedAt ?? new Date(),
      status: OrderStatus.PENDING,
      pricing: null,
      failureReason: null,
      queueJobId: null,
    });
  }
  static rehydrate(props: OrderProps) {
    return new Order(props);
  }
  toJson(): OrderProps {
    return { ...this.props };
  }
  attachQueueJob(jobId: string) {
    if (this.props.queueJobId) return;
    this.props.queueJobId = jobId;
  }
  markProcessing() {
    this.assertPending();
    this.props.status = OrderStatus.PROCESSING;
  }
  markCompleted(pricing: Pricing) {
    this.assertProcessing();
    this.props.status = OrderStatus.COMPLETED;
    this.props.pricing = pricing;
    this.props.failureReason = null;
  }
  markFailed(reason: string) {
    if (
      this.props.status !== OrderStatus.PENDING &&
      this.props.status !== OrderStatus.PROCESSING
    )
      throw new InvalidOrderStateError(
        `Cannot fail order ${this.id} from state ${this.props.status}`,
      );

    this.props.status = OrderStatus.FAILED;
    this.props.failureReason = reason;
  }
  isProcessing(): boolean {
    return this.props.status === OrderStatus.PROCESSING;
  }
  isPending(): boolean {
    return this.props.status === OrderStatus.PENDING;
  }
  private assertPending() {
    if (!this.isPending()) {
      throw new InvalidOrderStateError(`Order ${this.id} is not pending`);
    }
  }
  private assertProcessing() {
    if (!this.isProcessing()) {
      throw new InvalidOrderStateError(`Order ${this.id} is not processing`);
    }
  }
}
