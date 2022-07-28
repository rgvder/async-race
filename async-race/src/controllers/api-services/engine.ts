import Loader from '../loader';
import { BaseObject } from '../../models/base.interface';
import { Car } from '../../models/car.interface';
import { CarEngineResp } from '../../models/car-engine-resp.interface';

export function startCarEngine(params: Car): Promise<CarEngineResp> {
  return Loader.patch('engine', params);
}

export function switchCarEngine(params: Car): Promise<BaseObject> {
  return Loader.patch('engine', params);
}
