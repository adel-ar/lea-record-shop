export const PLACE_ORDER_TASK = 'place-order';
export type PlaceOrderPayload = {
  customerId: string;
  catalogId: string;
  quantity: number;
};
