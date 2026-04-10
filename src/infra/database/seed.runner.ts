import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CatalogSeed } from './catalog.seed';
import { CustomerSeed } from './customer.seed';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedRunner implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedRunner.name);

  constructor(
    private readonly customerSeed: CustomerSeed,
    private readonly catalogSeed: CatalogSeed,
    private readonly configServer: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    console.log('SEED RUNNER BOOTSTRAP EXECUTADO');
    const enableSeed = this.configServer.get('ENABLE_SEED');
    this.logger.log(`ENABLE_SEED = ${enableSeed}`);

    if (enableSeed !== 'true') {
      this.logger.log('Seed disabled.');
      return;
    }

    this.logger.log('Running database seeds...');

    await this.customerSeed.run();
    await this.catalogSeed.run();

    this.logger.log('Database seed completed.');
  }
}
