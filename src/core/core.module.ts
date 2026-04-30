import { Module } from '@nestjs/common';
import { EVENT_PUBLISHER } from './tokens';

@Module({
    providers: [
        {
            provide: "hh",
            useValue: {
                publish: (event: string, payload: any) => {
                    console.log(`[CORE EVENT] ${event}`, payload);
                },
            },
        },
    ],
    exports: ["hh"],
})
export class CoreModule { }
