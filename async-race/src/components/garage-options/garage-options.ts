import { createCar, updateCar } from '../../controllers/api-services/garage';
import { colorRandomizer, nameRandomizer } from '../car/car-randomizer';
import { Car } from '../../models/car.interface';
import { Winner } from '../../models/winner.interface';
import { createWinner, getWinner, updateWinner } from '../../controllers/api-services/winners';
import ElementBuilder from '../../controllers/element-builder';
import templatePopup from '../popup/template';

export function removeDisabled() {
  const buttonRace: HTMLButtonElement = document.querySelector('.race') as HTMLButtonElement;

  if (buttonRace.hasAttribute('disabled')) {
    buttonRace.removeAttribute('disabled');
  }
}

const createElemCar = async (currentRenderPage: () => void) => {
  const inputCreateCarName: HTMLInputElement = document.querySelector('.create-car__name') as HTMLInputElement;
  const inputCreateCarColor: HTMLInputElement = document.querySelector('.create-car__color') as HTMLInputElement;

  await createCar({
    name: inputCreateCarName.value ? inputCreateCarName.value : nameRandomizer(),
    color: inputCreateCarColor.value,
  });

  currentRenderPage();
};

const generateElemCars = (currentRenderPage: () => void) => {
  const arrayOfCreateCar: Promise<Car>[] = Array(100).fill(undefined).map(() => createCar({
    name: nameRandomizer(),
    color: colorRandomizer(),
  }));

  Promise.all(arrayOfCreateCar)
    .then(() => currentRenderPage());
};

export function createElementCar(currentRenderPage: () => void) {
  const buttonCreate: HTMLButtonElement = document.querySelector('.create-car__button') as HTMLButtonElement;

  buttonCreate.addEventListener('click', () => createElemCar(currentRenderPage));
}

export function generate100Cars(currentRenderPage: () => void) {
  const buttonGenerateCars: HTMLButtonElement = document.querySelector('.generate-cars') as HTMLButtonElement;

  buttonGenerateCars.addEventListener('click', () => {
    generateElemCars(currentRenderPage);
  });
}

export function updateElementCar(currentRenderPage: () => void): void {
  const buttonUpdateCar: HTMLButtonElement = document.querySelector('.update-car__button') as HTMLButtonElement;
  const updateCarColor: HTMLInputElement = document.querySelector('.update-car__color') as HTMLInputElement;
  const updateCarName: HTMLInputElement = document.querySelector('.update-car__name') as HTMLInputElement;

  buttonUpdateCar.addEventListener('click', async () => {
    const selectedCarId: string | undefined = buttonUpdateCar.dataset.carId;

    if (selectedCarId && updateCarColor && updateCarName) {
      await updateCar({
        name: updateCarName.value,
        color: updateCarColor.value,
        id: selectedCarId,
      });

      currentRenderPage();
    }
  });
}

let hasWinner: boolean = false;
let startCount: number = 0;

export function setStartCount(count: number) {
  startCount = count;
}

export function areAllFinished() {
  startCount -= 1;

  if (!startCount) {
    const buttonReset: HTMLButtonElement = document.querySelector('.reset') as HTMLButtonElement;
    buttonReset.removeAttribute('disabled');
  }
}

function addPopup(name: string | undefined, time: number) {
  const elementPopup: HTMLElement = ElementBuilder
    .buildElement(templatePopup({ name, time }));

  document.body.append(elementPopup);

  const popup: HTMLElement = document.querySelector('.popup') as HTMLElement;

  setTimeout(() => popup.remove(), 3000);
}

export function setDisabled(force: boolean) {
  hasWinner = force;
  const buttonCreate: HTMLButtonElement = document.querySelector('.create-car__button') as HTMLButtonElement;
  const buttonReset: HTMLButtonElement = document.querySelector('.reset') as HTMLButtonElement;
  const buttonGenerateCars: HTMLButtonElement = document.querySelector('.generate-cars') as HTMLButtonElement;

  const inputCreateCarName: HTMLInputElement = document.querySelector('.create-car__name') as HTMLInputElement;
  const inputCreateCarColor: HTMLInputElement = document.querySelector('.create-car__color') as HTMLInputElement;

  buttonCreate.toggleAttribute('disabled', !force);
  buttonReset.toggleAttribute('disabled', !force);
  buttonGenerateCars.toggleAttribute('disabled', !force);
  inputCreateCarName.toggleAttribute('disabled', !force);
  inputCreateCarColor.toggleAttribute('disabled', !force);
}

export async function isWinner(car: Car, duration: number) {
  if (!hasWinner) {
    addPopup(car.name, duration);
    setDisabled(true);
    areAllFinished();

    try {
      const elemWinner: Winner = await getWinner(car.id);

      await updateWinner({
        wins: elemWinner.wins + 1,
        time: (Math.min(duration, elemWinner.time)),
      }, elemWinner.id);
    } catch {
      await createWinner({
        id: car.id,
        time: duration,
        wins: 1,
      });
    }
  }
}
