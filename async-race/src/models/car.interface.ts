import { BaseObject } from './base.interface';

export interface Car extends BaseObject {
  id: number;
  name?: string;
  color?: string;
  status?: 'started' | 'stopped' | 'drive';
}
