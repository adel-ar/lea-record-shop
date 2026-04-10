import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import * as catalogReadRepository from './infra/catalog-read.repository';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}
  @Post('insert')
  async insert(@Body() body) {
    return await this.catalogService.insert(body);
  }
  @Get('list')
  async list(@Query() filter: catalogReadRepository.CatalogQueryProps) {
    return await this.catalogService.list(filter);
  }
  @Post('update')
  async update(@Body() body) {
    return await this.catalogService.update(body);
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.catalogService.get(id);
  }
}
