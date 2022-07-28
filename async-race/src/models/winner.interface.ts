import { BaseObject } from './base.interface';

export interface Winner extends BaseObject {
  id: number;
  wins: number;
  time: number;
}
