import { Car } from '../../models/car.interface';
import ElementBuilder from '../../controllers/element-builder';
import { templateCar } from './template';
import { startCarEngine, switchCarEngine } from '../../controllers/api-services/engine';

export default function initCar(car: Car, container: HTMLElement) {
  let buttonSelect: HTMLButtonElement;
  let buttonStart: HTMLButtonElement;
  let buttonEnd: HTMLButtonElement;

  let racer: HTMLElement;
  let carContent: HTMLElement;
  let carWrapperId: string | undefined;
  let carId: number;
  let racerAnimation: Animation;

  function createElements(wrapper: HTMLElement): void {
    buttonSelect = wrapper.querySelector('.buttonSelect') as HTMLButtonElement;
    buttonStart = wrapper.querySelector('.buttonStart') as HTMLButtonElement;
    buttonEnd = wrapper.querySelector('.buttonEnd') as HTMLButtonElement;

    racer = wrapper.querySelector('.car__racer') as HTMLElement;
    carContent = wrapper.querySelector('.car__container') as HTMLElement;

    carWrapperId = (wrapper.firstElementChild as HTMLElement).dataset?.id;
    carId = carWrapperId ? +carWrapperId : NaN;
  }

  const startCarCallback = async () => {
    buttonStart.setAttribute('disabled', '');
    buttonEnd.removeAttribute('disabled');

    const start = await startCarEngine({ id: carId, status: 'started' });

    racerAnimation = racer.animate(
      [
        {
          transform: 'translateX(0)',
        },

        {
          transform: `translateX(${carContent.clientWidth}px)`,
        },
      ],
      {
        duration: start.distance / start.velocity,
        fill: 'forwards',
      },
    );

    try {
      await switchCarEngine({ id: carId, status: 'drive' });
    } catch (error) {
      if ((error as Error).message === '500') {
        racerAnimation.pause();
      }
    }
  };

  const endCarCallback = async () => {
    buttonEnd.setAttribute('disabled', '');
    buttonStart.removeAttribute('disabled');

    racerAnimation.pause();
    await startCarEngine({ id: carId, status: 'stopped' });
    racerAnimation.currentTime = 0;
  };

  function selectCar(): void {
    if (Number.isNaN(carId)) {
      return;
    }

    buttonSelect.addEventListener('click', () => {
      const updateCarColor: HTMLInputElement = document.querySelector('.update-car__color') as HTMLInputElement;
      const updateCarName: HTMLInputElement = document.querySelector('.update-car__name') as HTMLInputElement;
      const buttonUpdateCar: HTMLButtonElement = document.querySelector('.update-car__button') as HTMLButtonElement;

      if (car) {
        updateCarColor.value = car.color?.toString() || '';
        updateCarName.value = car.name?.toString() || '';
        buttonUpdateCar.dataset.carId = carId.toString();
        buttonUpdateCar.removeAttribute('disabled');
        updateCarColor.removeAttribute('disabled');
        updateCarName.removeAttribute('disabled');
      }
    });
  }

  function startCar(): void {
    if (Number.isNaN(carId)) {
      return;
    }

    buttonStart.addEventListener('click', startCarCallback);
  }

  function endCar(): void {
    if (Number.isNaN(carId)) {
      return;
    }

    buttonEnd.addEventListener('click', endCarCallback);
  }

  const elementCar: HTMLElement = ElementBuilder.buildElement(templateCar(car));

  createElements(elementCar);

  selectCar();
  startCar();
  endCar();

  container.append(elementCar);
}
