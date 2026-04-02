import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'receipts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    //forwardRef(() => NotificationsModule),
    NotificationsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  //exports: [OrdersService]
})
export class OrdersModule { }
