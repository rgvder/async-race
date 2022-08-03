import Loader from '../loader';
import { Car } from '../../models/car.interface';
import { BaseObject } from '../../models/base.interface';
import { Cars } from '../../models/cars.interface';

export function getCars(paginator: BaseObject): Promise<Cars> {
  return Loader.getPage('garage', paginator);
}

export function getCar(id: number): Promise<Car> {
  return Loader.get(`garage/${id}`);
}

export function createCar(data: BaseObject): Promise<Car> {
  return Loader.post('garage', data);
}

export function deleteCar(id: number): Promise<Car> {
  return Loader.delete(`garage/${id}`);
}

export function updateCar(data: BaseObject): Promise<Car> {
  return Loader.put(`garage/${data.id}`, data);
}
