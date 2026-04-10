import { Injectable } from '@nestjs/common';
import { Catalog } from 'src/app/catalog/domain/catalog';
import { CatalogRepository } from 'src/app/catalog/infra/catalog.repository';
import { Money } from 'src/app/common/money';

@Injectable()
export class CatalogSeed {
  customerRepository: any;
  constructor(private readonly catalogRepository: CatalogRepository) {}

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
    const customer2 = Catalog.create({
      name: 'Discovery',
      artist: 'Daft Punk',
      releaseYear: 2001,
      style: 'Electronic',
      quantity: 15,
      price: 12,
      perOrder: 4,
    });

    await this.catalogRepository.saveMany([catalog1, customer2]);
  }
}
