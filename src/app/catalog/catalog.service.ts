import { Injectable } from '@nestjs/common';
import { Catalog } from './domain/catalog';
import { CatalogRepository } from './infra/catalog.repository';
import { StockRepository } from '../stock/infra/stock.repository';
import {
  CatalogQueryProps,
  CatalogReadRepository,
} from './infra/catalog-read.repository';

@Injectable()
export class CatalogService {
  constructor(
    private readonly catalogRepo: CatalogRepository,
    private readonly stockRepository: StockRepository,
    private readonly catalogReadRepo: CatalogReadRepository,
  ) {}
  async insert(body) {
    const payload = Catalog.create(body);
    const insert = await this.catalogRepo.persist(payload);
    await this.stockRepository.initialize(insert.id, insert.quantity);
    return insert;
  }
  async list(filter: CatalogQueryProps) {
    return this.catalogReadRepo.list(filter);
  }
  async update(body) {
    const catalogItem = Catalog.rehydrate(body);
    const update = this.catalogRepo.persist(catalogItem);
    return update;
  }
  async get(id: string) {
    return this.catalogRepo.findById(id);
  }
}
