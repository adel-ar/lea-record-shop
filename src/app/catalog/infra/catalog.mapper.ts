import { CustomerEntity } from 'src/app/customer/infra/customer.entity';
import { Catalog } from '../domain/catalog';
import { CatalogEntity } from 'src/app/catalog/infra/catalog.entity';
import { Money } from 'src/app/common/money';

export class CatalogMapper {
  static toDomain(entity: CatalogEntity): Catalog {
    const price = new Money(entity.price.amount, entity.price.currency);
    return new Catalog(
      entity.id,
      entity.name,
      entity.artist,
      entity.releaseYear,
      entity.style,
      entity.quantity,
      price,
      entity.perOrder,
    );
  }
  static toPersistence(domain: Catalog): CatalogEntity {
    const entity = new CatalogEntity();
    entity.id = domain.id!;
    entity.name = domain.name;
    entity.artist = domain.artist;
    entity.releaseYear = domain.releaseYear;
    entity.style = domain.style;
    entity.quantity = domain.quantity;
    entity.perOrder = domain.perOrder;
    entity.price = {
      amount: domain.price.amount,
      currency: domain.price.currency,
    };
    return entity;
  }
}
