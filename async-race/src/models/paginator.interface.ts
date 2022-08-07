import { BaseObject } from './base.interface';

export interface Paginator extends BaseObject {
  page: number;
  limit: number;
  total?: number;
}

export interface PaginatorInstance {
  value: Paginator;
  update: (paginator: Paginator) => void;
}
