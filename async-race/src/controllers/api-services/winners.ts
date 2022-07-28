import Loader from '../loader';
import { BaseObject } from '../../models/base.interface';
import { Winner } from '../../models/winner.interface';
import { Winners } from '../../models/winners.interface';

function getWinners(params: BaseObject): Promise<Winners> {
  return Loader.getPage('winners', params);
}

function getWinner(id: number): Promise<Winner> {
  return Loader.get(`winners/${id}`);
}

function createWinner(data: BaseObject): Promise<Winner> {
  return Loader.post('winners', data);
}

function deleteWinner(id: BaseObject): Promise<Winner> {
  return Loader.delete(`winners/${id}`);
}

function updateWinner(data: BaseObject, id: BaseObject): Promise<Winner> {
  return Loader.put(`winners/${id}`, data);
}
