import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Post()
    create(@Body() dto: any) {
        return this.ordersService.createOrder(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: any) {
        return this.ordersService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}