import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { toJSON } from '../utils';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('interface');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const call$ = next.handle();
    const request = context.switchToHttp().getRequest<Request>();
    const content = `${request.ip} ${request.method} -> ${request.url} `;
    //替换password 为 ****
    const jsonStr = toJSON(request.body).replace(
      /"password":"(.*)"/g,
      '"password":"****"',
    );
    const requestStart = `${request.ip} ${request.method} <- ${request.url}`;
    this.logger.debug('body: ' + jsonStr);
    const now = Date.now();
    this.logger.log('req: ' + requestStart);
    return call$.pipe(
      tap(() => this.logger.log('res:' + content + `${Date.now() - now}ms`)),
    );
  }
}
