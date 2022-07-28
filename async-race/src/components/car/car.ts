import { Car } from '../../models/car.interface';
import ElementBuilder from '../../controllers/element-builder';
import { templateCar } from './template';
import { startCarEngine, switchCarEngine } from '../../controllers/api-services/engine';

export default function initCar(car: Car, container: HTMLElement) {
  let buttonSelect: HTMLButtonElement;
  let buttonRemove: HTMLButtonElement;
  let buttonStart: HTMLButtonElement;
  let buttonEnd: HTMLButtonElement;

  let racer: HTMLElement;
  let garageContent: HTMLElement;
  let carWrapperId: string | undefined;
  let carId: number;

  function createElements(wrapper: HTMLElement): void {
    buttonSelect = wrapper.querySelector('.buttonSelect') as HTMLButtonElement;
    buttonRemove = wrapper.querySelector('.buttonRemove') as HTMLButtonElement;
    buttonStart = wrapper.querySelector('.buttonStart') as HTMLButtonElement;
    buttonEnd = wrapper.querySelector('.buttonEnd') as HTMLButtonElement;

    racer = wrapper.querySelector('.car__racer') as HTMLElement;
    garageContent = document.querySelector('.garage__content') as HTMLElement;

    carWrapperId = (wrapper.firstElementChild as HTMLElement).dataset?.id;
    carId = carWrapperId ? +carWrapperId : NaN;
  }

  const startCarCallback = async () => {
    buttonStart.setAttribute('disabled', '');
    buttonEnd.removeAttribute('disabled');

    const start = await startCarEngine({ id: carId, status: 'started' });

    const racerAnimation: Animation = racer.animate(
      [
        {
          transform: 'translateX(0)',
        },

        {
          transform: `translateX(${garageContent.clientWidth}px)`,
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

    racer.getAnimations().forEach((animation: Animation) => animation.pause());
    await startCarEngine({ id: carId, status: 'stopped' });
    racer.getAnimations().forEach((animation: Animation) => animation.cancel());
  };

  function selectCar(): void {
    if (Number.isNaN(carId)) {
      return;
    }

    buttonSelect.addEventListener('click', () => {
      console.log(carId);
    });
  }

  function removeCar() {
    if (Number.isNaN(carId)) {
      return;
    }

    buttonRemove.addEventListener('click', () => {
      console.log(carId);
    });
  }

  function startCar(): void {
    const buttonRace: HTMLButtonElement = document.querySelector('.race') as HTMLButtonElement;

    if (Number.isNaN(carId)) {
      return;
    }

    buttonStart.addEventListener('click', startCarCallback);
    buttonRace.addEventListener('click', startCarCallback);
  }

  function endCar(): void {
    const buttonReset: HTMLButtonElement = document.querySelector('.reset') as HTMLButtonElement;

    if (Number.isNaN(carId)) {
      return;
    }

    buttonEnd.addEventListener('click', endCarCallback);
    buttonReset.addEventListener('click', endCarCallback);
  }

  const elementCar: HTMLElement = ElementBuilder.buildElement(templateCar(car));

  createElements(elementCar);

  selectCar();
  removeCar();
  startCar();
  endCar();

  container.append(elementCar);
}
