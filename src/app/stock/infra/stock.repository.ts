export abstract class StockRepository {
  abstract reserve(catalogId: string, quantity: number): Promise<boolean>;
  abstract release(catalogId: string, quantity: number): Promise<void>;
  abstract getAvailable(catalogId: string): Promise<number>;
  abstract initialize(catalogId: string, quantity: number): Promise<void>;
}
