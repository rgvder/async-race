import ElementBuilder from '../../controllers/element-builder';
import { templateGarage } from './template';
import { Cars } from '../../models/cars.interface';
import { getCars } from '../../controllers/api-services/garage';
import { Car } from '../../models/car.interface';
import initCar from '../car/car';

export function renderCars(cars: Car[]): void {
  const garageContent: HTMLElement = document.querySelector('.garage__content') as HTMLElement;
  cars.forEach((car: Car) => initCar(car, garageContent));
}

export function initGarage(): void {
  getCars({ _page: 1, _limit: 7 })
    .then((cars: Cars) => {
      const elementGarage: HTMLElement = ElementBuilder
        .buildElement(templateGarage({ total: cars.total }));
      document.body.append(elementGarage);

      renderCars(cars.items);
    });
}
