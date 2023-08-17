import {
  HTTP_SUCCESS_MESSAGE,
  USE_PAGINATION,
} from '../constant/http.constant';
import { createDecorator } from '../utils';

export const Pagination = () =>
  createDecorator(USE_PAGINATION, { usePaginate: true });

export const Message = (message: string) =>
  createDecorator(HTTP_SUCCESS_MESSAGE, message);
