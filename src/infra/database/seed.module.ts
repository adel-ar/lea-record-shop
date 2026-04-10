import { Module } from '@nestjs/common';
import { CustomerSeed } from './customer.seed';
import { CatalogSeed } from './catalog.seed';
import { SeedRunner } from './seed.runner';
import { CustomerModule } from 'src/app/customer/customer.module';
import { CatalogModule } from 'src/app/catalog/catalog.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CustomerModule, CatalogModule, ConfigModule],

  providers: [CustomerSeed, CatalogSeed, SeedRunner],
})
export class SeedModule {}
