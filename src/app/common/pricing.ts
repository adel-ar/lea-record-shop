import { Money } from './money';

export class Pricing {
  private constructor(
    public readonly unitPrice: Money,
    public readonly subtotal: Money,
    public readonly discount: Money,
    public readonly total: Money,
  ) {}
  static fromUnitPrice(unitPrice: Money, quantity: number): Pricing {
    const subtotal = unitPrice.multiply(quantity);
    return new Pricing(
      unitPrice,
      subtotal,
      new Money(0, unitPrice.currency),
      subtotal,
    );
  }
  static rehydrate(params: {
    unitPrice: Money;
    subtotal: Money;
    discount: Money;
    total: Money;
  }) {
    return new Pricing(
      params.unitPrice,
      params.subtotal,
      params.discount,
      params.total,
    );
  }
  applyDiscount(discount: Money): Pricing {
    return new Pricing(
      this.unitPrice,
      this.subtotal,
      discount,
      this.subtotal.subtract(discount),
    );
  }
  applyPercentageDiscount(percent: number): Pricing {
    const discount = this.subtotal.percentage(percent);
    return this.applyDiscount(discount);
  }
}
