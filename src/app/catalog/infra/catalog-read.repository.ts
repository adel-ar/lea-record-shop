import { InjectRepository } from '@nestjs/typeorm';
import { CatalogEntity } from 'src/app/catalog/infra/catalog.entity';
import { Repository } from 'typeorm';
export interface CatalogQueryProps {
  name?: string;
  artist?: string;
  style?: string;
  releaseYear?: string;
}
export class CatalogReadRepository {
  constructor(
    @InjectRepository(CatalogEntity)
    private readonly catalogRepo: Repository<CatalogEntity>,
  ) {}
  async list(filters: CatalogQueryProps) {
    const qb = this.catalogRepo.createQueryBuilder('catalog');
    if (filters?.name)
      qb.andWhere('LOWER(catalg.name LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    if (filters?.artist)
      qb.andWhere('LOWER(catalg.artist LIKE LOWER(:artist)', {
        name: `%${filters.artist}%`,
      });
    if (filters?.style)
      qb.andWhere('catalog.style = :style', { style: filters.style });
    if (filters?.releaseYear)
      qb.andWhere('catalog.releaseYear = :releaseYear', {
        releaseYear: filters.releaseYear,
      });
    return qb.getMany();
  }
}
