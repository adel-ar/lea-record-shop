import { ProcessingRuntime } from '../../../core/processing/processor.runtime';
import { OrderWorker } from '../../../app/order/app/order.work';
import { Order } from '../../../app/order/domain/order.aggregate';
import { OrderStatus } from '../../../app/order/domain/order.types';
jest.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}));
describe('OrderWorker', () => {
  let worker: OrderWorker;
  let orderRepository: any;
  let runtime: any;

  const mockJob = {
    data: {
      type: 'place-order',
      payload: {},
      metadata: {
        orderId: 'order-1',
      },
    },
  };
  beforeEach(() => {
    orderRepository = { get: jest.fn(), persiste: jest.fn() };
    runtime = { execute: jest.fn() };
    worker = new OrderWorker(
      orderRepository,
      runtime as unknown as ProcessingRuntime,
    );
  });
  it('should process pending order successfully', async () => {
    const order = Order.createPending({
      id: 'order-1',
      customerId: 'c1',
      catalogId: 'p1',
      quantity: 1,
    });
    orderRepository.get.mockResolvedValue(order);
    runtime.execute.mockResolvedValue({});
    await worker.process(mockJob as any);
    expect(orderRepository.persiste).toHaveBeenCalledTimes(1);
    expect(runtime.execute).toHaveBeenCalled();
    expect(order.status).toBe(OrderStatus.PROCESSING);
  });
  it('should skip completed order', async () => {
    const order = Order.createPending({
      id: 'order-1',
      customerId: 'c1',
      catalogId: 'p1',
      quantity: 1,
    });
    order.markProcessing();
    order.markCompleted({
      total: { amount: 10, currency: 'BRL' },
    } as any);
    orderRepository.get.mockResolvedValue(order);
    await worker.process(mockJob as any);
    expect(runtime.execute).not.toHaveBeenCalled();
    expect(orderRepository.persiste).not.toHaveBeenCalled();
  });
  it('should mark order as failed when runtime throws', async () => {
    const order = Order.createPending({
      id: 'order-1',
      customerId: 'c1',
      catalogId: 'p1',
      quantity: 1,
    });
    orderRepository.get.mockResolvedValue(order);
    runtime.execute.mockRejectedValue(new Error('boom'));
    await expect(worker.process(mockJob as any)).rejects.toThrow('boom');
    expect(order.toJson().failureReason).toBe('boom');
    expect(orderRepository.persiste).toHaveBeenCalledTimes(2);
  });
  it('should throw if order does exist', async () => {
    orderRepository.get.mockResolvedValue(null);
    await expect(worker.process(mockJob as any)).rejects.toThrow(
      'Order not found',
    );
  });
});
