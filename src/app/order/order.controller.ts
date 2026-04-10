import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ListOrdersQuery } from './app/read-model/list-orders.query';
import { type OrderQueryFieltsProps } from './domain/order.types';

@Controller('order')
export class OrderControler {
  constructor(
    private readonly orderService: OrderService,
    private readonly projectionOrder: ListOrdersQuery,
  ) {}
  @Post('create')
  async order(@Body() body: any) {
    return await this.orderService.orderProcessor(body);
  }
  @Get('list')
  async list(@Query() query: OrderQueryFieltsProps) {
    return await this.projectionOrder.execute(query);
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.orderService.get(id);
  }
}
