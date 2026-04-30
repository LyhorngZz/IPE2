import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let method = 'GRAPHQL';
        let url = 'resolver';

        if (context.getType() === 'http') {
            const req = context.switchToHttp().getRequest();
            method = req.method;
            url = req.url;
        }

        const start = Date.now();

        return next.handle().pipe(
            tap(() => {
                const ms = Date.now() - start;
                console.log(`[${method}] ${url} - ${ms}ms`);
            }),
        );
    }
}