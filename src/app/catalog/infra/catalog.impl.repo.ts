import { Injectable } from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogEntity } from './catalog.entity';
import { Repository } from 'typeorm';
import { CatalogMapper } from 'src/app/catalog/infra/catalog.mapper';
import { Catalog } from 'src/app/catalog/domain/catalog';

@Injectable()
export class TypeOrmCatalogRepository implements CatalogRepository {
  constructor(
    @InjectRepository(CatalogEntity)
    private readonly repo: Repository<CatalogEntity>,
  ) {}
  async findById(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? CatalogMapper.toDomain(entity) : null;
  }
  async persist(catalog: Catalog) {
    const saved = await this.repo.save(CatalogMapper.toPersistence(catalog));
    return CatalogMapper.toDomain(saved);
  }
  async list(): Promise<Catalog[]> {
    const entities = await this.repo.find();
    return entities.flatMap((entity) => CatalogMapper.toDomain(entity));
  }
}
