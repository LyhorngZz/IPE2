import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReceiptsController } from "./receipts.controller";
import { ReceiptsService } from "./receipts.service";
import { Receipt } from "./receipts.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        TypeOrmModule.forFeature([Receipt]),
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
    ],
    controllers: [ReceiptsController],
    providers: [ReceiptsService],
})
export class ReceiptsModule {}