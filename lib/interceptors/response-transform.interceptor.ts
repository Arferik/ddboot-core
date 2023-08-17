import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import {
  HTTP_SUCCESS_MESSAGE,
  USE_PAGINATION,
} from '../constant/http.constant';
import {
  HttpResponsePagination,
  HttpResponseSuccess,
} from '../interfaces/http-response.interface';
import { getDecoratorValue } from '../utils';

const DEFAULT_CODE = '0000';

/**
 * 请求成功转换器
 */
@Injectable()
export class ResponseTransformInterceptor<T>
  implements
    NestInterceptor<T, T | HttpResponseSuccess<T> | HttpResponsePagination<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T | HttpResponseSuccess<T>> {
    const call$ = next.handle();
    const target = context.getHandler();
    const successMessage = getDecoratorValue(HTTP_SUCCESS_MESSAGE, target);
    const usePaginate = getDecoratorValue(USE_PAGINATION, target);

    return call$.pipe<T>(
      map((data: any) => {
        const result = usePaginate
          ? {
              data: data.data,
              total: data.total,
              pageSize: data.pageSize,
              pageNumber: data.pageNumber,
            }
          : ({ data } as any);

        return {
          message: successMessage || 'successful request',
          code: DEFAULT_CODE,
          ...result,
        };
      }),
    );
  }
}
