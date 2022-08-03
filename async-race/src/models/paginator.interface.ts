import { BaseObject } from './base.interface';

export interface Paginator extends BaseObject {
  page: number;
  limit: number;
  total?: number;
}
