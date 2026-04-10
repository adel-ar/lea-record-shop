import { Money } from 'src/app/common/money';
import { v4 as uuid } from 'uuid';
export class Catalog {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artist: string,
    public readonly releaseYear: number,
    public readonly style: string,
    public readonly quantity: number,
    public readonly price: Money,
    public readonly perOrder?: number,
  ) {}
  static create(params: {
    name: string;
    artist: string;
    releaseYear: number;
    style: string;
    quantity: number;
    price: number;
    perOrder?: number;
  }) {
    const currenPrice = Money.brl(params.price);
    return new Catalog(
      uuid(),
      params.name,
      params.artist,
      params.releaseYear,
      params.style,
      params.quantity,
      currenPrice,
      params.perOrder,
    );
  }
  static rehydrate(params: {
    id: string;
    name: string;
    artist: string;
    releaseYear: number;
    style: string;
    quantity: number;
    price: number;
    perOrder?: number;
  }) {
    const currenPrice = Money.brl(params.price);
    return new Catalog(
      params.id,
      params.name,
      params.artist,
      params.releaseYear,
      params.style,
      params.quantity,
      currenPrice,
      params.perOrder,
    );
  }
}
