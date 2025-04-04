import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Logger } from '../../../application/shared/logger';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    this.logger.log(`Request url: ${request.url}, method: ${request.method}`);
    const startAt = Date.now();

    return next.handle().pipe(
      map((data?) => {
        this.logger.log(`Response time: ${Date.now() - startAt}ms`);
        return data;
      }),
    );
  }
}
