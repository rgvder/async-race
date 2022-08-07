import { BaseObject } from './base.interface';

export interface SortingWinners extends BaseObject {
  sort: 'id' | 'wins' | 'time';
  order: 'ASC' | 'DESC';
}
