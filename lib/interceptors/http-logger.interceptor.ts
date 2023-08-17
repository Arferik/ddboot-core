import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectLogger, ILogger, Logger } from '@ddboot/log4js';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { toJSON } from '../utils';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private logger: Logger;

  constructor(@InjectLogger() private readonly log4j: ILogger) {
    this.logger = this.log4j.getLogger('interface');
  }

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
    this.logger.info('req: ' + requestStart);
    return call$.pipe(
      tap(() => this.logger.info('res:' + content + `${Date.now() - now}ms`)),
    );
  }
}
