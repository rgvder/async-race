import Loader from '../loader';
import { BaseObject } from '../../models/base.interface';
import { Winner } from '../../models/winner.interface';
import { Winners } from '../../models/winners.interface';

export function getWinners(params: BaseObject): Promise<Winners> {
  return Loader.getPage('winners', params);
}

export function getWinner(id: number): Promise<Winner> {
  return Loader.get(`winners/${id}`);
}

export function createWinner(data: BaseObject): Promise<Winner> {
  return Loader.post('winners', data);
}

export function deleteWinner(id: number): Promise<Winner> {
  return Loader.delete(`winners/${id}`);
}

export function updateWinner(data: BaseObject, id: number): Promise<Winner> {
  return Loader.put(`winners/${id}`, data);
}
