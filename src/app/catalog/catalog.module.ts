import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogEntity } from 'src/app/catalog/infra/catalog.entity';
import { TypeOrmCatalogRepository } from 'src/app/catalog/infra/catalog.impl.repo';
import { CatalogRepository } from 'src/app/catalog/infra/catalog.repository';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { StockModule } from '../stock/infra/stock.module';
import { CatalogReadRepository } from './infra/catalog-read.repository';
@Module({
  imports: [TypeOrmModule.forFeature([CatalogEntity]), StockModule],
  providers: [
    {
      provide: CatalogRepository,
      useClass: TypeOrmCatalogRepository,
    },
    {
      provide: CatalogReadRepository,
      useClass: CatalogReadRepository,
    },
    CatalogService,
  ],
  controllers: [CatalogController],
  exports: [CatalogRepository],
})
export class CatalogModule {}
