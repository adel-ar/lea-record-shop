// export type ContextPayload = {
//   customer: Customer;
//   catalogItem: Catalog;
//   stockReserved: boolean;
//   pricing: Pricing;
//   order: Order;
// };
export type TaskPayload = Record<string, unknown>;
export type taskMetadata = {
  currelationid?: string;
  requestedAt?: Date;
  requestedBy?: string;
  orderId?: string;
  correlationId?: string;
};
export type Task<TPayload extends TaskPayload = TaskPayload> = {
  type: string;
  payload: TPayload;
  metadata?: taskMetadata;
};
