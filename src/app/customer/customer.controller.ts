import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post('insert')
  async insert(@Body() body) {
    return this.customerService.insert(body);
  }
  @Get('list')
  async list() {
    return this.customerService.list();
  }
  @Post('update')
  async update(@Body() body) {
    return this.customerService.update(body);
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.customerService.get(id);
  }
}
