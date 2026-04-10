export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'BRL',
  ) {
    if (amount < 0) {
      throw new Error('Money cannot be negative');
    }
  }
  static brl(price: number): Money {
    return new Money(price, 'BRL');
  }
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }
  multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }
  toNumber(): number {
    return Number(this.amount);
  }
  percentage(percent: number): Money {
    return this.multiply(percent / 100);
  }
  private assertSameCurrency(other: Money) {
    if (this.currency !== other.currency) {
      throw new Error('currency mismatch');
    }
  }
}
