import { v4 as uuid } from 'uuid';

export class Customer {
  constructor(
    public readonly id: string | null,
    public readonly document: string,
    public readonly fullName: string,
    public readonly birthDate: Date,
    public readonly email: string,
    public readonly phone: string,
    public readonly active: boolean = true,
  ) {}
  static create(params: {
    document: string;
    fullName: string;
    birthDate: Date;
    email: string;
    phone: string;
    active: boolean;
  }) {
    return new Customer(
      uuid(),
      params.document,
      params.fullName,
      params.birthDate,
      params.email,
      params.phone,
      params.active,
    );
  }
  static rehydrate(params: {
    id: string;
    document: string;
    fullName: string;
    birthDate: Date;
    email: string;
    phone: string;
    active: boolean;
  }) {
    return new Customer(
      params.id,
      params.document,
      params.fullName,
      params.birthDate,
      params.email,
      params.phone,
      params.active,
    );
  }
  deactivate(): Customer {
    if (!this.active) return this;
    return new Customer(
      this.id,
      this.document,
      this.fullName,
      this.birthDate,
      this.email,
      this.phone,
      false,
    );
  }
  canPlaceOrder(): boolean {
    return this.active;
  }
}
