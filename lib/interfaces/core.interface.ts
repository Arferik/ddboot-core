import { HttpStatus } from '@nestjs/common';

export interface DecoratorCreatorOption {
  errorCode?: HttpStatus;
  successCode?: HttpStatus;
  errorMessage?: string;
  successMessage?: string;
  usePaginate?: boolean;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  pageSize: number;
  pageNumber: number;
}
