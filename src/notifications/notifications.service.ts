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

    constructor(
        @Inject(EVENT_PUBLISHER)
        private readonly publisher: EventPublisher,
    ) { }

    // notify(event: string, payload: any) {
    //     console.log(`[NOTIFY] ${event}`, payload);
    //     return { ok: true };
    // }

    notify(event: string, payload: any) {
        this.publisher.publish(event, payload);
        return { ok: true };
    }
}
