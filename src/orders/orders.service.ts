import { forwardRef, Inject, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
    private orders: any[] = [];

    constructor(
        @Inject('RABBITMQ_SERVICE') private client: ClientProxy,

        //@Inject(forwardRef(() => NotificationsService))
        private readonly notifications: NotificationsService,
    ) { }

    findAll() {
        return this.orders;
    }

    findOne(id: string) {
        const order = this.orders.find(o => o.id === id);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    createOrder(orderDto: any) {
        const order = {
            id: Date.now().toString(),
            ...orderDto,
            createdAt: new Date().toISOString(),
        };

        this.orders.push(order);

        //RabbitMQ event
        // this.client.emit('order_created', {
        //     order,
        //     createdAt: new Date().toISOString(),
        // });

        //Notification
        this.notifications.notify('order_created', { order });

        return order;
    }

    update(id: string, dto: any) {
        const order = this.findOne(id);

        Object.assign(order, dto);

        this.notifications.notify('order_updated', { order });

        return order;
    }

    remove(id: string) {
        const index = this.orders.findIndex(o => o.id === id);

        if (index === -1) {
            throw new NotFoundException('Order not found');
        }

        const deleted = this.orders.splice(index, 1);

        this.notifications.notify('order_deleted', { id });

        return { deleted: true, order: deleted[0] };
    }
}