import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from 'src/core/tokens';
//import { OrdersService } from 'src/orders/orders.service';

type EventPublisher = {
    publish: (event: string, payload: any) => void;
};
@Injectable()
export class NotificationsService {

    // constructor(
    //     @Inject(forwardRef(() => OrdersService))
    //     private readonly ordersService: OrdersService,
    // ) { }

    // notify(event: string, payload: any) {
    //     console.log(`[NOTIFY] ${event}`, payload);
    //     return { ok: true };
    // }
    constructor(
        @Inject("hh")
        private readonly publisher: EventPublisher,
    ) { }

    notify(event: string, payload: any) {
        this.publisher.publish(event, payload);
        return { ok: true };
    }
}
