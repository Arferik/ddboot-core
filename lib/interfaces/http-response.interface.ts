export enum HttpResponseStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}
export interface HttpResponseSuccess<T> {
  result: T | HttpResponsePagination<T>;
  message: string;
  code: string;
}

export interface HttpResponsePagination<T> {
  data: T;
  total: number;
  page_number: number;
  page_size: number;
}

export type ExceptionInfo =
  | string
  | {
      error_message: string;
      error_reason: string;
      error?: any;
    };

export type HttpErrorData = {
  error_message: string;
  error_code: string;
};
