import { Injectable } from '@nestjs/common';
import { Catalog } from 'src/app/catalog/domain/catalog';
import { CatalogRepository } from 'src/app/catalog/infra/catalog.repository';
import { Money } from 'src/app/common/money';
import { StockRepository } from 'src/app/stock/infra/stock.repository';

@Injectable()
export class CatalogSeed {
  customerRepository: any;
  constructor(
    private readonly catalogRepository: CatalogRepository,
    private readonly stockRepository: StockRepository,
  ) {}

  async run() {
    const existing = await this.catalogRepository.list();

    if (existing.length > 0) {
      return;
    }
    // const price1 = new Money(10, 'brl');
    const catalog1 = Catalog.create({
      name: 'Random Access Memories',
      artist: 'Daft Punk',
      releaseYear: 2013,
      style: 'Electronic',
      quantity: 10,
      price: 15,
      perOrder: 6,
    });
    const catalog2 = Catalog.create({
      name: 'Discovery',
      artist: 'Daft Punk',
      releaseYear: 2001,
      style: 'Electronic',
      quantity: 15,
      price: 12,
      perOrder: 4,
    });

    await this.catalogRepository.saveMany([catalog1, catalog2]);
    await this.stockRepository.initialize(catalog1.id, catalog1.quantity);
    await this.stockRepository.initialize(catalog2.id, catalog2.quantity);
  }
}
