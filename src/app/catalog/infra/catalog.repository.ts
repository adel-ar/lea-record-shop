import { Catalog } from 'src/app/catalog/domain/catalog';

export abstract class CatalogRepository {
  abstract findById(id: string): Promise<Catalog | null>;
  // abstract findByEmail(email: string): Promise<Customer | null>;
  abstract persist(catalog: Catalog): Promise<Catalog>;
  abstract list(): Promise<Catalog[]>;
  abstract saveMany(customer: Catalog[]): Promise<Catalog[]>;
}
