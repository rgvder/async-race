import ElementBuilder from '../../controllers/element-builder';
import templateGarage from './template';
import { Cars } from '../../models/cars.interface';
import { deleteCar, getCars } from '../../controllers/api-services/garage';
import { Car } from '../../models/car.interface';
import {
  createElementCar,
  generate100Cars, removeDisabled, setDisabled, setStartCount,
  updateElementCar,
} from '../garage-options/garage-options';
import { Paginator, PaginatorInstance } from '../../models/paginator.interface';
import addPagination from '../pagination/pagination';
import { deleteWinner } from '../../controllers/api-services/winners';
import initCar from '../car/car';

const currentPaginator: Paginator = {
  page: 1,
  limit: 7,
};

let garagePaginator: PaginatorInstance;

export function renderCars(cars: Car[]): void {
  const garageContent: HTMLElement = document.querySelector('.garage__content') as HTMLElement;

  garageContent.innerHTML = '';
  cars.forEach((car: Car) => initCar(car, garageContent));
}

export function renderGaragePage(paginator: Paginator): void {
  getCars(paginator)
    .then((cars: Cars) => {
      const carsTotalCount: HTMLElement = document.querySelector('.garage__carsTotal') as HTMLElement;

      const buttonUpdateCar: HTMLButtonElement = document.querySelector('.update-car__button') as HTMLButtonElement;
      const updateCarColor: HTMLInputElement = document.querySelector('.update-car__color') as HTMLInputElement;
      const updateCarName: HTMLInputElement = document.querySelector('.update-car__name') as HTMLInputElement;

      carsTotalCount.innerText = cars.total.toString();
      renderCars(cars.items);
      buttonUpdateCar.setAttribute('disabled', '');
      updateCarColor.setAttribute('disabled', '');
      updateCarName.setAttribute('disabled', '');

      updateCarColor.value = '#000000';
      updateCarName.value = '';

      currentPaginator.total = Math.ceil(cars.total / currentPaginator.limit);
      garagePaginator.update(currentPaginator);
    });
}

export function currentRenderGaragePage() {
  removeDisabled();
  renderGaragePage(currentPaginator);
}

function removeCarHandler(): void {
  document.addEventListener('click', async (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const carId: string | undefined = eventTarget.dataset.id;

    if (carId && eventTarget?.classList?.contains('buttonRemove')) {
      deleteWinner(+carId)
        .catch(() => null)
        .then(() => deleteCar(+carId))
        .then(() => currentRenderGaragePage());
    }
  });
}

function raceHandler() {
  const buttonRace: HTMLButtonElement = document.querySelector('.race') as HTMLButtonElement;

  buttonRace.addEventListener('click', () => {
    const buttonsStart: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.buttonStart');

    setStartCount(buttonsStart.length);

    buttonsStart.forEach((buttonStart: HTMLButtonElement) => {
      buttonStart.click();
    });

    buttonRace.setAttribute('disabled', '');
    setDisabled(false);
  });
}

function resetHandler() {
  const buttonReset: HTMLButtonElement = document.querySelector('.reset') as HTMLButtonElement;

  buttonReset.addEventListener('click', () => {
    const buttonsEnd: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.buttonEnd');
    buttonsEnd.forEach((buttonEnd: HTMLButtonElement) => buttonEnd.click());

    removeDisabled();
  });
}

export function initGarage(): void {
  const elementGarage: HTMLElement = ElementBuilder
    .buildElement(templateGarage({}));

  document.body.append(elementGarage);

  createElementCar(currentRenderGaragePage);
  generate100Cars(currentRenderGaragePage);
  updateElementCar(currentRenderGaragePage);
  removeCarHandler();
  raceHandler();
  resetHandler();
  garagePaginator = addPagination('.garage', currentPaginator, renderGaragePage);
  renderGaragePage(currentPaginator);
}
